import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { DatabaseException } from '../../shared/exception-handlers';
import { DatabaseErrorMessages } from '../../shared/constants';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RecipeService {

    constructor(
        @InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>,
    ) {
    }

    public async findAll(id: number): Promise<RecipeEntity[]> {
        return await this.recipeRepository
                         .createQueryBuilder('recipe')
                         .leftJoinAndSelect('recipe.categories', 'categories')
                         .leftJoinAndSelect('recipe.ingredients', 'ingredients')
                         .leftJoinAndSelect('recipe.status_id', 'status')
                         .leftJoinAndSelect('recipe.difficulty_id', 'difficulty')
                         .where('user_id = :id', { id })
                         .getMany();
    }

    public async create(userId: number, recipe: Partial<RecipeEntity>): Promise<RecipeEntity> {
        try {
            return await this.recipeRepository.save({
                ...recipe,
                user_id: userId,
            });
        } catch (e) {
            this.catchDatabaseException(e);
        }
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
