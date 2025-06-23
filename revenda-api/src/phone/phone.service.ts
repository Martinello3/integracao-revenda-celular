import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './phone.entity';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  async create(createPhoneDto: CreatePhoneDto) {
    // REGRA DE NEGÓCIO 2: Não permitir celulares com mesmo modelo da mesma marca
    const existingPhone = await this.phoneRepository.findOne({
      where: {
        model: createPhoneDto.model,
        brandId: createPhoneDto.brandId
      }
    });

    if (existingPhone) {
      throw new ConflictException(`Celular '${createPhoneDto.model}' já existe para esta marca`);
    }

    const phone = this.phoneRepository.create(createPhoneDto);
    return this.phoneRepository.save(phone);
  }

  findAll() {
    return this.phoneRepository.find({
      relations: ['brand', 'accessories'],
    });
  }

  findOne(id: number) {
    return this.phoneRepository.findOne({
      where: { id },
      relations: ['brand', 'accessories'],
    });
  }

  findByBrand(brandId: number) {
    return this.phoneRepository.find({
      where: { brandId },
      relations: ['brand', 'accessories'],
    });
  }

  async update(id: number, updatePhoneDto: UpdatePhoneDto) {
    // REGRA DE NEGÓCIO 7: Não permitir redução de preço superior a 50%
    if (updatePhoneDto.price) {
      const existingPhone = await this.phoneRepository.findOne({ where: { id } });

      if (!existingPhone) {
        throw new NotFoundException(`Celular com ID ${id} não encontrado`);
      }

      const currentPrice = Number(existingPhone.price);
      const newPrice = Number(updatePhoneDto.price);
      const reductionPercentage = ((currentPrice - newPrice) / currentPrice) * 100;

      if (reductionPercentage > 50) {
        throw new BadRequestException(
          `Redução de preço de ${reductionPercentage.toFixed(1)}% não permitida. Máximo permitido: 50%`
        );
      }
    }

    return this.phoneRepository.update(id, updatePhoneDto);
  }

  async remove(id: number) {
    // REGRA DE NEGÓCIO 6: Não permitir deletar phones que estão em vendas
    const phone = await this.phoneRepository.findOne({ where: { id } });

    if (!phone) {
      throw new NotFoundException(`Celular com ID ${id} não encontrado`);
    }

    // Verificar se o phone está em alguma venda através de sale_items
    const phoneInSales = await this.phoneRepository
      .createQueryBuilder('phone')
      .innerJoin('sale_items', 'si', 'si.product_id = phone.id AND si.productType = :type', { type: 'phone' })
      .where('phone.id = :id', { id })
      .getOne();

    if (phoneInSales) {
      throw new BadRequestException(
        `Não é possível deletar celular que está associado a vendas. Modelo: ${phone.model}`
      );
    }

    return this.phoneRepository.delete(id);
  }
}
