import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendPriceAlert(chain: string, price: number, email: string) {
    const message = `The price of ${chain} has reached $${price}.`;
    await this.transporter.sendMail({
      from: 'alerts@price-tracker.com',
      to: email,
      subject: `${chain} Price Alert`,
      text: message,
    });
  }
}