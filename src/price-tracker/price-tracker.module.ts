
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './price-tracker.service';
import { AlertController } from './price-tracker.controller';
import { Price } from './entities/price.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'tracker',
      entities: [Price],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Price]),
  ],
  providers: [PriceService],
  controllers: [AlertController],
})
export class AppModule {}