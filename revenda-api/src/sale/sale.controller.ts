import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.saleService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.saleService.findByCustomer(+customerId);
  }

  @Get('store/:storeId')
  findByStore(@Param('storeId') storeId: string) {
    return this.saleService.findByStore(+storeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.saleService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
}
