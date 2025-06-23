import { Injectable } from '@nestjs/common';
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

  remove(id: number) {
    return this.storeRepository.delete(id);
  }
}
