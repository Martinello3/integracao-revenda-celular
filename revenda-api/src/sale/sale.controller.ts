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

  // Dashboard endpoints (must come before dynamic routes)
  @Get('dashboard/stats')
  getDashboardStats() {
    return this.saleService.getDashboardStats();
  }

  @Get('dashboard/monthly')
  getSalesByMonth() {
    return this.saleService.getSalesByMonth();
  }

  @Get('dashboard/top-products')
  getTopProducts() {
    return this.saleService.getTopProducts();
  }

  @Get('dashboard/recent')
  getRecentSales(@Query('limit') limit?: string) {
    return this.saleService.getRecentSales(limit ? +limit : 10);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.saleService.findAll(status);
  }

  @Get('customer/:customerId')
  findByCustomer(@Param('customerId') customerId: string) {
    return this.saleService.findByCustomer(+customerId);
  }

  @Get('store/:storeId')
  findByStore(@Param('storeId') storeId: string) {
    return this.saleService.findByStore(+storeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
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
