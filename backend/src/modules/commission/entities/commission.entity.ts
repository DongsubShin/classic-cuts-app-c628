import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn, Index } from 'typeorm';
import { Barber } from '../../barber/entities/barber.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('commissions')
export class Commission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Barber, (barber) => barber.commissions)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Column({ name: 'barber_id' })
  barberId: string;

  @OneToOne(() => Booking, (booking) => booking.commission)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Index()
  @Column({ name: 'booking_id' })
  bookingId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 2 })
  commissionRate: number;

  @Column({ name: 'paid_at', type: 'timestamp with time zone', nullable: true })
  paidAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}