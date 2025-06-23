import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ 
    type: 'enum', 
    enum: ['regular', 'premium', 'vip'],
    default: 'regular'
  })
  customerType: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany('Sale', (sale: any) => sale.customer)
  sales: any[];
}
