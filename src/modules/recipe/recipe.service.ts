import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { DatabaseException } from '../../shared/exception-handlers';
import { DatabaseErrorMessages } from '../../shared/constants';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ApiService } from '../../shared/interfaces';

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
        try {
            return fromPromise(this.recipeRepository.save(this.recipeToSave(recipe)));
        } catch (e) {
            this.catchDatabaseException(e);
        }
    }

    public update(id: number, recipe: RecipeEntity): Observable<UpdateResult> {
        return fromPromise(this.recipeRepository.update(id, recipe));
    }

    public delete(id: number): Observable<DeleteResult> {
        return fromPromise(this.recipeRepository.delete(id));
    }

    private catchDatabaseException(e): never {
        throw new DatabaseException({
            code: e.code,
            message: DatabaseErrorMessages[e.code] || e.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private recipeToSave(recipe: Partial<RecipeEntity>): Partial<RecipeEntity> {
        return {
            user_id: 1,
            status_id: 1,
            difficulty_id: +recipe.difficulty_id,
            name: recipe.name,
            photo_url: recipe.photo_url || '',
            ingredient_description: recipe.ingredient_description,
            recipe_description: recipe.recipe_description,
            time: recipe.time,
        };
    }
}
