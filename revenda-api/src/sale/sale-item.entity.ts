import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('sale_items')
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sale_id' })
  saleId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ 
    type: 'enum', 
    enum: ['phone', 'accessory']
  })
  productType: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne('Sale', (sale: any) => sale.items)
  @JoinColumn({ name: 'sale_id', referencedColumnName: 'id' })
  sale: any;
}
