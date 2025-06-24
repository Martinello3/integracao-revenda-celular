import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, In } from 'typeorm';
import { Accessory } from './accessory.entity';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';
import { Phone } from '../phone/phone.entity';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectRepository(Accessory)
    private accessoryRepository: Repository<Accessory>,
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  async create(createAccessoryDto: CreateAccessoryDto) {
    // REGRA DE NEGÓCIO 7: Não permitir criar acessórios com preço negativo
    if (createAccessoryDto.price < 0) {
      throw new BadRequestException(
        `Preço não pode ser negativo. Valor informado: R$ ${createAccessoryDto.price}`
      );
    }

    const { compatiblePhoneIds, ...accessoryData } = createAccessoryDto;
    const accessory = this.accessoryRepository.create(accessoryData);

    // Se há celulares compatíveis, buscar e associar
    if (compatiblePhoneIds && compatiblePhoneIds.length > 0) {
      const phones = await this.phoneRepository.find({
        where: { id: In(compatiblePhoneIds) }
      });
      accessory.compatiblePhones = phones;
    }

    return this.accessoryRepository.save(accessory);
  }

  // REGRA DE NEGÓCIO 4: Método específico para buscar apenas com estoque
  async findAllInStock() {
    const accessories = await this.accessoryRepository.find({
      where: { stock: MoreThan(0) },
      relations: ['compatiblePhones'],
    });

    if (accessories.length === 0) {
      throw new BadRequestException('Nenhum acessório disponível em estoque no momento');
    }

    return accessories;
  }

  findAll() {
    return this.accessoryRepository.find({
      relations: ['compatiblePhones'],
    });
  }

  findOne(id: number) {
    return this.accessoryRepository.findOne({
      where: { id },
      relations: ['compatiblePhones'],
    });
  }

  findByCategory(category: string) {
    return this.accessoryRepository.find({
      where: { category },
      relations: ['compatiblePhones'],
    });
  }

  findInStock() {
    return this.accessoryRepository
      .createQueryBuilder('accessory')
      .where('accessory.stock > 0')
      .getMany();
  }

  async update(id: number, updateAccessoryDto: UpdateAccessoryDto) {
    const { compatiblePhoneIds, ...accessoryData } = updateAccessoryDto;

    // Atualizar dados básicos do acessório
    await this.accessoryRepository.update(id, accessoryData);

    // Se há celulares compatíveis para atualizar
    if (compatiblePhoneIds !== undefined) {
      const accessory = await this.accessoryRepository.findOne({
        where: { id },
        relations: ['compatiblePhones']
      });

      if (accessory) {
        if (compatiblePhoneIds.length > 0) {
          const phones = await this.phoneRepository.find({
            where: { id: In(compatiblePhoneIds) }
          });
          accessory.compatiblePhones = phones;
        } else {
          accessory.compatiblePhones = [];
        }
        await this.accessoryRepository.save(accessory);
      }
    }

    return { message: 'Acessório atualizado com sucesso' };
  }

  async updateStock(id: number, quantity: number) {
    // REGRA DE NEGÓCIO 8: Não permitir reduzir estoque abaixo de 0
    const accessory = await this.accessoryRepository.findOne({ where: { id } });

    if (!accessory) {
      throw new BadRequestException(`Acessório com ID ${id} não encontrado`);
    }

    const newStock = accessory.stock + quantity;

    if (newStock < 0) {
      throw new BadRequestException(
        `Operação resultaria em estoque negativo. Estoque atual: ${accessory.stock}, Quantidade solicitada: ${quantity}, Resultado: ${newStock}`
      );
    }

    return this.accessoryRepository
      .createQueryBuilder()
      .update(Accessory)
      .set({ stock: () => `stock + ${quantity}` })
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number) {
    return this.accessoryRepository.delete(id);
  }
}
