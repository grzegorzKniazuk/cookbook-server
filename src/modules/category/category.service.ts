import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    ) {
    }

    public findAll(): Observable<CategoryEntity[]> {
        return fromPromise(this.categoryRepository.find());
    }

    public create(category: Partial<CategoryEntity>): Observable<CategoryEntity> {
        return fromPromise(this.categoryRepository.save(category));
    }

    public update(id: number, category: CategoryEntity): Observable<UpdateResult> {
        return fromPromise(this.categoryRepository.update(id, category));
    }

    public delete(id: number): Observable<DeleteResult> {
        return fromPromise(this.categoryRepository.delete(id));
    }
}
