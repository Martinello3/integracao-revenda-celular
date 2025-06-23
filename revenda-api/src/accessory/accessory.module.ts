import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessory } from './accessory.entity';
import { AccessoryController } from './accessory.controller';
import { AccessoryService } from './accessory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Accessory])],
  controllers: [AccessoryController],
  providers: [AccessoryService],
  exports: [AccessoryService],
})
export class AccessoryModule {}
