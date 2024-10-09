import { Controller, Post, Body } from '@nestjs/common';
import { PriceService } from './price-tracker.service';

@Controller('alerts')
export class AlertController {
  constructor(private readonly priceTrackerService: PriceService) {}

  @Post()
  async setAlert(@Body() body: { chain: string; targetPrice: number; email: string }) {
    await this.priceTrackerService.setAlert(body.chain, body.targetPrice, body.email);
    return { message: 'Alert set successfully!' };
  }
}