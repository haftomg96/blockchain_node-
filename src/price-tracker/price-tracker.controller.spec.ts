import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PriceService } from './price-tracker.service';
import {EmailService} from './email.service'

@Controller('prices')
export class PricesController {
  constructor(private readonly priceService: PriceService) {}

  @Get('hourly')
  getHourlyPrices(@Query('chain') chain: string) {
    return this.priceService.getHourlyPrices(chain);
  }
}

@Controller('alert')
export class AlertController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  setAlert(@Body() alertData: { chain: string; price: number; email: string }) {
    // Logic to save alert in DB and check it when prices are fetched
    this.emailService.sendPriceAlert(alertData.chain, alertData.price, alertData.email);
  }
}