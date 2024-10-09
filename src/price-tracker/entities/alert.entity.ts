import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alerts')
export class AlertEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chain: string;

  @Column('decimal')
  targetPrice: number;

  @Column()
  email: string;
}