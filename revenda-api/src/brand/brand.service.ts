import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    // REGRA DE NEGÓCIO: Não permitir marcas duplicadas
    const existingBrand = await this.brandRepository.findOne({
      where: { name: createBrandDto.name }
    });

    if (existingBrand) {
      throw new ConflictException(`Marca '${createBrandDto.name}' já existe no sistema`);
    }

    const brand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(brand);
  }

  findAll() {
    return this.brandRepository.find({
      relations: ['phones'],
    });
  }

  findOne(id: number) {
    return this.brandRepository.findOne({
      where: { id },
      relations: ['phones'],
    });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.update(id, updateBrandDto);
  }

  remove(id: number) {
    return this.brandRepository.delete(id);
  }
}
