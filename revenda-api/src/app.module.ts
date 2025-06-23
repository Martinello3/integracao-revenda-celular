import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';

// Import modules
import { BrandModule } from './brand/brand.module';
import { PhoneModule } from './phone/phone.module';
import { AccessoryModule } from './accessory/accessory.module';
import { StoreModule } from './store/store.module';
import { CustomerModule } from './customer/customer.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    BrandModule,
    PhoneModule,
    AccessoryModule,
    StoreModule,
    CustomerModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
