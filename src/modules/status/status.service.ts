import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEntity } from './status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>,
    ) {
    }
}
