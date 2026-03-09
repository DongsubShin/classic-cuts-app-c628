import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationStatus, NotificationType } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}

  async scheduleReminder(clientId: string, content: string, scheduledAt: Date) {
    const notification = this.notificationRepo.create({
      clientId,
      content,
      scheduledAt,
      type: NotificationType.SMS,
      status: NotificationStatus.SCHEDULED,
    });
    return this.notificationRepo.save(notification);
  }

  // Simulated Cron Job method
  async processPendingNotifications() {
    const pending = await this.notificationRepo.find({
      where: { status: NotificationStatus.SCHEDULED },
    });

    for (const note of pending) {
      try {
        this.logger.log(`Sending SMS to client ${note.clientId}: ${note.content}`);
        // Integration with Twilio/AWS SNS would go here
        note.status = NotificationStatus.SENT;
        note.sentAt = new Date();
      } catch (err) {
        note.status = NotificationStatus.FAILED;
      }
      await this.notificationRepo.save(note);
    }
  }
}