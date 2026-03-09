import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Client } from '../../client/entities/client.entity';

export enum NotificationType {
  SMS = 'sms',
  EMAIL = 'email',
}

export enum NotificationStatus {
  SCHEDULED = 'scheduled',
  SENT = 'sent',
  FAILED = 'failed',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.notifications)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ type: 'text' })
  content: string;

  @Index()
  @Column({ name: 'scheduled_at', type: 'timestamp with time zone' })
  scheduledAt: Date;

  @Column({ name: 'sent_at', type: 'timestamp with time zone', nullable: true })
  sentAt: Date;

  @Index()
  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.SCHEDULED,
  })
  status: NotificationStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}