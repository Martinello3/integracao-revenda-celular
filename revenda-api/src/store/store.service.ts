import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    const store = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(store);
  }

  findAll() {
    return this.storeRepository.find({
      relations: ['sales'],
    });
  }

  findOne(id: number) {
    return this.storeRepository.findOne({
      where: { id },
      relations: ['sales'],
    });
  }

  findActive() {
    return this.storeRepository.find({
      where: { status: 'active' },
    });
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return this.storeRepository.update(id, updateStoreDto);
  }

  async remove(id: number) {
    // REGRA DE NEGÓCIO: Não permitir deletar loja que possui vendas associadas
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ['sales'],
    });

    if (!store) {
      throw new NotFoundException(`Loja com ID ${id} não encontrada`);
    }

    if (store.sales && store.sales.length > 0) {
      throw new BadRequestException(
        `Não é possível deletar a loja '${store.name}' pois existem ${store.sales.length} venda(s) associada(s) a ela`
      );
    }

    return this.storeRepository.delete(id);
  }
}
