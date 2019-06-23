import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ApiService } from '../../shared/interfaces';

@Injectable()
export class IngredientService implements ApiService<IngredientEntity> {

    constructor(
        @InjectRepository(IngredientEntity) private readonly ingredientRepository: Repository<IngredientEntity>,
    ) {
    }

    public findAll(): Observable<IngredientEntity[]> {
        return fromPromise(this.ingredientRepository.find());
    }

    public create(ingredient: Partial<IngredientEntity>): Observable<IngredientEntity> {
        return fromPromise(this.ingredientRepository.save(ingredient));
    }

    public update(id: number, ingredient: IngredientEntity): Observable<UpdateResult> {
        return fromPromise(this.ingredientRepository.update(id, ingredient));
    }

    public delete(id: number): Observable<DeleteResult> {
        return fromPromise(this.ingredientRepository.delete(id));
    }
}
