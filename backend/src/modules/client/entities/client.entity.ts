import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Notification } from '../../notification/entities/notification.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.client, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Index()
  @Column({ name: 'phone' })
  phone: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'visit_count', default: 0 })
  visitCount: number;

  @OneToMany(() => Booking, (booking) => booking.client)
  bookings: Booking[];

  @OneToMany(() => Notification, (notification) => notification.client)
  notifications: Notification[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}