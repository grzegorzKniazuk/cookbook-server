import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DifficultyEntity } from './difficulty.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ApiService } from '../../shared/interfaces';

@Injectable()
export class DifficultyService implements ApiService<DifficultyEntity> {

    constructor(
        @InjectRepository(DifficultyEntity) private readonly difficultyRepository: Repository<DifficultyEntity>,
    ) {
    }

    public findAll(): Observable<DifficultyEntity[]> {
        return fromPromise(this.difficultyRepository.find());
    }

    public create(difficultyLevel: Partial<DifficultyEntity>): Observable<DifficultyEntity> {
        return fromPromise(this.difficultyRepository.save(difficultyLevel));
    }

    public update(id: number, difficultyLevel: DifficultyEntity): Observable<UpdateResult> {
        return fromPromise(this.difficultyRepository.update(id, difficultyLevel));
    }

    public delete(id: number): Observable<DeleteResult> {
        return fromPromise(this.difficultyRepository.delete(id));
    }
}
