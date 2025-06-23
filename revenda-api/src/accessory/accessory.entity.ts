import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('accessories')
export class Accessory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'varchar', length: 500 })
  image: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToMany('Phone', (phone: any) => phone.accessories)
  @JoinTable({
    name: 'accessory_phone_compatibility',
    joinColumn: { name: 'accessory_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'phone_id', referencedColumnName: 'id' }
  })
  compatiblePhones: any[];
}
