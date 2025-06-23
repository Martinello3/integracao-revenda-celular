import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @OneToMany('Phone', (phone: any) => phone.brand)
  phones: any[];
}
