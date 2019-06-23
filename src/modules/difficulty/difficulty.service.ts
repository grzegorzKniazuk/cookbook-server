import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DifficultyEntity } from './difficulty.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DifficultyService {

    constructor(
        @InjectRepository(DifficultyEntity) private readonly difficultyRepository: Repository<DifficultyEntity>,
    ) {
    }

    public async findAll(): Promise<DifficultyEntity[]> {
        return await this.difficultyRepository.find();
    }

    public async create(difficultyLevel: Partial<DifficultyEntity>): Promise<DifficultyEntity> {
        return await this.difficultyRepository.save(difficultyLevel);
    }

    public async update(id: number, difficultyLevel: DifficultyEntity): Promise<UpdateResult> {
        return await this.difficultyRepository.update(id, difficultyLevel);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.difficultyRepository.delete(id);
    }
}
