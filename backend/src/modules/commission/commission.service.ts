import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commission } from './entities/commission.entity';
import { Booking } from '../booking/entities/booking.entity';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission)
    private commissionRepo: Repository<Commission>,
  ) {}

  async calculateForBooking(booking: Booking): Promise<Commission> {
    const rate = booking.barber.baseCommissionRate || 0;
    const amount = (booking.totalPrice * rate) / 100;

    const commission = this.commissionRepo.create({
      barberId: booking.barberId,
      bookingId: booking.id,
      amount,
      commissionRate: rate,
    });

    return this.commissionRepo.save(commission);
  }

  async getBarberEarnings(barberId: string): Promise<any> {
    return this.commissionRepo
      .createQueryBuilder('commission')
      .where('commission.barber_id = :barberId', { barberId })
      .select('SUM(commission.amount)', 'total')
      .getRawOne();
  }
}