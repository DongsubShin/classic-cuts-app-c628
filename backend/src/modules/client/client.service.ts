import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientRepo.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepo.findOne({
      where: { id },
      relations: ['bookings', 'bookings.service'],
    });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async updateNotes(id: string, notes: string): Promise<Client> {
    const client = await this.findOne(id);
    client.notes = notes;
    return this.clientRepo.save(client);
  }
}