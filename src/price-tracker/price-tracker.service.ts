// price.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriceService {
  private readonly MORALIS_API_URL = 'https://api.moralis.io';
  private readonly API_KEY = process.env.API_KEY;

  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}
  async getPrice(chain: string): Promise<number> {
    const response = await axios.get(`${this.MORALIS_API_URL}/price`, {
      params: { chain },
      headers: { 'X-API-Key': this.API_KEY },
    });
    return response.data.usdPrice;
  }

  async getHourlyPrices(chain: string): Promise<Price[]> {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    return this.priceRepository
      .createQueryBuilder('price')
      .where('price.chain = :chain', { chain })
      .andWhere('price.timestamp > :oneDayAgo', { oneDayAgo })
      .orderBy('price.timestamp', 'ASC')
      .getMany();
  }

  async setAlert(chain: string,body:number,email:string): Promise<Price[]> {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    return this.priceRepository
      .createQueryBuilder('price')
      .where('price.chain = :chain', { chain })
      .andWhere('price.timestamp > :oneDayAgo', { oneDayAgo })
      .orderBy('price.timestamp', 'ASC')
      .getMany();
  }


  @Cron(CronExpression.EVERY_5_MINUTES)
  async trackPrices() {
    const ethPrice = await this.getPrice('ethereum');
    const polygonPrice = await this.getPrice('polygon');
    
    this.savePrice('ethereum', ethPrice);
    this.savePrice('polygon', polygonPrice);
    
    this.checkForAlerts('ethereum', ethPrice);
    this.checkForAlerts('polygon', polygonPrice);
  }

  private savePrice(chain: string, price: number) {
    // Logic to save price in RDB (e.g., PostgreSQL)
  }

  private checkForAlerts(chain: string, price: number) {
    // Check price change for last hour and send email if conditions met
  }
}