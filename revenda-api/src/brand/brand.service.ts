import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
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

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    // REGRA DE NEGÓCIO: Não permitir marcas duplicadas (exceto a própria marca sendo editada)
    if (updateBrandDto.name) {
      const existingBrand = await this.brandRepository.findOne({
        where: { name: updateBrandDto.name }
      });

      if (existingBrand && existingBrand.id !== id) {
        throw new ConflictException(`Marca '${updateBrandDto.name}' já existe no sistema`);
      }
    }

    return this.brandRepository.update(id, updateBrandDto);
  }

  async remove(id: number) {
    // REGRA DE NEGÓCIO: Não permitir deletar marca que possui celulares associados
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['phones'],
    });

    if (!brand) {
      throw new BadRequestException(`Marca com ID ${id} não encontrada`);
    }

    if (brand.phones && brand.phones.length > 0) {
      throw new BadRequestException(
        `Não é possível deletar a marca '${brand.name}' pois existem ${brand.phones.length} celular(es) associado(s) a ela`
      );
    }

    return this.brandRepository.delete(id);
  }
}
