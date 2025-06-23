import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'store_id' })
  storeId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalValue: number;

  @Column({ 
    type: 'enum', 
    enum: ['pix', 'debit', 'credit'],
    default: 'pix'
  })
  paymentMethod: string;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending'
  })
  status: string;

  @Column({ type: 'varchar', length: 200 })
  seller: string;

  @ManyToOne('Customer', (customer: any) => customer.sales)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: any;

  @ManyToOne('Store', (store: any) => store.sales)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: any;

  @OneToMany('SaleItem', (saleItem: any) => saleItem.sale, { cascade: true })
  items: any[];
}
