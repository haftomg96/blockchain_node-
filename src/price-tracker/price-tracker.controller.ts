
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('alert')
export class AlertController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  setAlert(@Body() alertData: { chain: string; price: number; email: string }) {
    // Logic to save alert in DB and check it when prices are fetched
    this.emailService.sendPriceAlert(alertData.chain, alertData.price, alertData.email);
  }
}