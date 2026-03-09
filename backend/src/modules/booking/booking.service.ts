import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Service } from '../service/entities/service.entity';
import { CommissionService } from '../commission/commission.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
    private commissionService: CommissionService,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const service = await this.serviceRepo.findOneBy({ id: dto.serviceId });
    if (!service) throw new NotFoundException('Service not found');

    const startTime = new Date(dto.startTime);
    const endTime = new Date(startTime.getTime() + service.durationMinutes * 60000);

    const booking = this.bookingRepo.create({
      ...dto,
      endTime,
      totalPrice: service.price,
      status: BookingStatus.PENDING,
    });

    return this.bookingRepo.save(booking);
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({ 
      where: { id },
      relations: ['barber'] 
    });
    if (!booking) throw new NotFoundException('Booking not found');

    booking.status = status;
    const updated = await this.bookingRepo.save(booking);

    if (status === BookingStatus.COMPLETED) {
      await this.commissionService.calculateForBooking(updated);
    }

    return updated;
  }

  async findAll(filters: any): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: filters,
      relations: ['barber', 'client', 'service'],
      order: { startTime: 'DESC' },
    });
  }
}