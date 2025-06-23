import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessoryService } from './accessory.service';
import { CreateAccessoryDto } from './dto/create-accessory.dto';
import { UpdateAccessoryDto } from './dto/update-accessory.dto';

@Controller('accessories')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @Post()
  create(@Body() createAccessoryDto: CreateAccessoryDto) {
    return this.accessoryService.create(createAccessoryDto);
  }

  @Get()
  findAll() {
    return this.accessoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoryService.findOne(+id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.accessoryService.findByCategory(category);
  }

  @Get('stock/available')
  findInStock() {
    return this.accessoryService.findInStock();
  }

  @Get('stock/only-available')
  findAllInStock() {
    return this.accessoryService.findAllInStock();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessoryDto: UpdateAccessoryDto) {
    return this.accessoryService.update(+id, updateAccessoryDto);
  }

  @Patch(':id/stock')
  updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.accessoryService.updateStock(+id, quantity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessoryService.remove(+id);
  }
}
