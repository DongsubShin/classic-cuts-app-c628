import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToOne, Index } from 'typeorm';
import { Barber } from '../../barber/entities/barber.entity';
import { Client } from '../../client/entities/client.entity';
import { Service } from '../../service/entities/service.entity';
import { Commission } from '../../commission/entities/commission.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Barber, (barber) => barber.bookings)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'barber_id' })
  barberId: string;

  @ManyToOne(() => Client, (client) => client.bookings)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ name: 'service_id' })
  serviceId: string;

  @Index()
  @Column({ name: 'start_time', type: 'timestamp with time zone' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp with time zone' })
  endTime: Date;

  @Index()
  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @OneToOne(() => Commission, (commission) => commission.booking)
  commission: Commission;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}