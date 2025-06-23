import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 200 })
  manager: string;

  @Column({ type: 'boolean', default: false })
  isHeadquarters: boolean;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive', 'underMaintenance'],
    default: 'active'
  })
  status: string;

  @OneToMany('Sale', (sale: any) => sale.store)
  sales: any[];
}
