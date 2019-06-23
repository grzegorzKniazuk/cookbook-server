import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { DatabaseException } from '../../shared/exception-handlers';
import { DatabaseErrorMessages } from '../../shared/constants';

@Injectable()
export class RecipeService {

    constructor(
        @InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>,
    ) {
    }

    public async findAll(): Promise<RecipeEntity[]> {
        return await this.recipeRepository.find();
    }

    public async create(recipe: Partial<RecipeEntity>): Promise<RecipeEntity> {
        console.log(this.recipeToSave(recipe));
        try {
            return await this.recipeRepository.save(this.recipeToSave(recipe));
        } catch (e) {
            this.catchDatabaseException(e);
        }
    }

    public async update(id: number, recipe: RecipeEntity): Promise<UpdateResult> {
        return await this.recipeRepository.update(id, recipe);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.recipeRepository.delete(id);
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
            preparation_description: recipe.preparation_description,
            time: recipe.time,
        };
    }
}
