import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Accessory } from './accessory.entity';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectRepository(Accessory)
    private accessoryRepository: Repository<Accessory>,
  ) {}

  create(createAccessoryDto: CreateAccessoryDto) {
    // REGRA DE NEGÓCIO 7: Não permitir criar acessórios com preço negativo
    if (createAccessoryDto.price < 0) {
      throw new BadRequestException(
        `Preço não pode ser negativo. Valor informado: R$ ${createAccessoryDto.price}`
      );
    }

    const accessory = this.accessoryRepository.create(createAccessoryDto);
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

  update(id: number, updateAccessoryDto: UpdateAccessoryDto) {
    return this.accessoryRepository.update(id, updateAccessoryDto);
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
