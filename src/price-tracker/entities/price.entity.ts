// price.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chain: string;

  @Column('decimal')
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}