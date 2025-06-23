import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Brand } from '../brand/brand.entity';
import { Phone } from '../phone/phone.entity';
import { Accessory } from '../accessory/accessory.entity';
import { Store } from '../store/store.entity';
import { Customer } from '../customer/customer.entity';
import { Sale } from '../sale/sale.entity';
import { SaleItem } from '../sale/sale-item.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [Brand, Phone, Accessory, Store, Customer, Sale, SaleItem],
  migrations: [__dirname + '/../db/migrations/*{.ts,.js}', __dirname + '/../db/seeds/*{.ts,.js}'],
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
  migrationsRun: true,
});
