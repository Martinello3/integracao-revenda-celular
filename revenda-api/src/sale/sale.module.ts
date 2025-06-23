import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { SaleItem } from './sale-item.entity';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem])],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService],
})
export class SaleModule {}
