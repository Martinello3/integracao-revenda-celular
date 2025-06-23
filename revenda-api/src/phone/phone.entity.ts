import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  model: string;

  @Column({ type: 'varchar', length: 500 })
  image: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ name: 'brand_id' })
  brandId: number;

  @ManyToOne('Brand', (brand: any) => brand.phones)
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'id' })
  brand: any;

  @ManyToMany('Accessory', (accessory: any) => accessory.compatiblePhones)
  accessories: any[];
}
