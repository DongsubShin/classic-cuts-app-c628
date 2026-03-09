import { Controller, Post, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from './entities/booking.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/entities/user.entity';

@ApiTags('bookings')
@ApiCookieAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created' })
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.BARBER)
  @ApiOperation({ summary: 'Get all bookings (Admin/Barber only)' })
  findAll(@Query() query: any) {
    return this.bookingService.findAll(query);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.BARBER)
  @ApiOperation({ summary: 'Update booking status' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
  ) {
    return this.bookingService.updateStatus(id, status);
  }
}