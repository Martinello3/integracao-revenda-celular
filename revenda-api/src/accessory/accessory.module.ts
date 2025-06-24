import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessory } from './accessory.entity';
import { AccessoryController } from './accessory.controller';
import { AccessoryService } from './accessory.service';
import { Phone } from '../phone/phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accessory, Phone])],
  controllers: [AccessoryController],
  providers: [AccessoryService],
  exports: [AccessoryService],
})
export class AccessoryModule {}
