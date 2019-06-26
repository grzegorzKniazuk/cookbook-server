import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { DatabaseException } from '../../shared/exception-handlers';
import { DatabaseErrorMessages } from '../../shared/constants';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ApiService } from '../../shared/interfaces';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RecipeService implements ApiService<RecipeEntity> {

    constructor(
        @InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>,
    ) {
    }

    public findAll(): Observable<RecipeEntity[]> {
        return fromPromise(this.recipeRepository.find());
    }

    public create(recipe: Partial<RecipeEntity>): Observable<RecipeEntity> {
        return fromPromise(this.recipeRepository.save(recipe)).pipe(
            catchError((e) => this.catchDatabaseException(e)),
        );
    }

    public update(id: number, recipe: RecipeEntity): Observable<UpdateResult> {
        return fromPromise(this.recipeRepository.update(id, recipe)).pipe(
            catchError((e) => this.catchDatabaseException(e)),
        );
    }

    public delete(id: number): Observable<DeleteResult> {
        return fromPromise(this.recipeRepository.delete(id)).pipe(
            catchError((e) => this.catchDatabaseException(e)),
        );
    }

    private catchDatabaseException(e): never {
        throw new DatabaseException({
            code: e.code,
            message: DatabaseErrorMessages[e.code] || e.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
