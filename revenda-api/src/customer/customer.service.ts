import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // REGRA DE NEGÓCIO 3: Não permitir emails duplicados
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: createCustomerDto.email }
    });

    if (existingCustomer) {
      throw new ConflictException(`Email '${createCustomerDto.email}' já está em uso`);
    }

    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  findAll() {
    return this.customerRepository.find({
      relations: ['sales'],
    });
  }

  findOne(id: number) {
    return this.customerRepository.findOne({
      where: { id },
      relations: ['sales'],
    });
  }

  findByEmail(email: string) {
    return this.customerRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    // REGRA DE NEGÓCIO 8: Não permitir downgrade de VIP para regular
    if (updateCustomerDto.customerType) {
      const existingCustomer = await this.customerRepository.findOne({ where: { id } });

      if (!existingCustomer) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
      }

      if (existingCustomer.customerType === 'vip' && updateCustomerDto.customerType === 'regular') {
        throw new BadRequestException(
          'Não é permitido fazer downgrade de cliente VIP para regular. Entre em contato com o suporte.'
        );
      }
    }

    return this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: number) {
    // REGRA DE NEGÓCIO 9: Não permitir deletar clientes com vendas ativas
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['sales']
    });

    if (!customer) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }

    if (customer.sales && customer.sales.length > 0) {
      throw new BadRequestException(
        `Não é possível deletar cliente com vendas associadas. Cliente possui ${customer.sales.length} venda(s).`
      );
    }

    return this.customerRepository.delete(id);
  }
}
