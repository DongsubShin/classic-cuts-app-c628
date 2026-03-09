import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Commission } from '../../commission/entities/commission.entity';

@Entity('barbers')
export class Barber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.barber)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column('text', { array: true, default: '{}' })
  specialties: string[];

  @Column({ type: 'jsonb', name: 'working_hours', nullable: true })
  workingHours: any;

  @Column({ name: 'base_commission_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
  baseCommissionRate: number;

  @Index()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Booking, (booking) => booking.barber)
  bookings: Booking[];

  @OneToMany(() => Commission, (commission) => commission.barber)
  commissions: Commission[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}