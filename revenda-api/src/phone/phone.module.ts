import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  controllers: [PhoneController],
  providers: [PhoneService],
  exports: [PhoneService],
})
export class PhoneModule {}
