import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PriceTrackerModule } from './price-tracker/price-tracker.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Price } from './price-tracker/entities/price.entity';
import { AlertController } from './price-tracker/price-tracker.controller'; 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Price],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    AlertController,
  ],
})
export class AppModule {}