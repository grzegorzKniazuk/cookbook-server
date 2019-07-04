import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { DatabaseException } from '../../shared/exception-handlers';
import { DatabaseErrorMessages } from '../../shared/constants';
import { omit } from 'lodash';

@Injectable()
export class RecipeService {

    constructor(
        @InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>,
    ) {
    }

    public async findAll(userId: number): Promise<RecipeEntity[]> {
        return await this.recipeRepository
                         .createQueryBuilder('recipe')
                         .leftJoinAndSelect('recipe.categories', 'categories')
                         .leftJoinAndSelect('recipe.ingredients', 'ingredients')
                         .leftJoinAndSelect('recipe.status_id', 'status')
                         .leftJoinAndSelect('recipe.difficulty_id', 'difficulty')
                         .where('user_id = :userId', { userId })
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

    public async update(userId: number, recipeId: number, recipe: Partial<RecipeEntity>): Promise<UpdateResult> {
        const recipeData = omit(recipe, ['categories']);
        try {
            return await this.recipeRepository.update({ id: recipeId, user_id: userId }, recipeData);
        } catch (e) {
            this.catchDatabaseException(e);
        }
    }

    public async delete(id: number): Promise<DeleteResult> {
        try {
            return await this.recipeRepository.delete(id);
        } catch (e) {
            this.catchDatabaseException(e);
        }
    }

    private catchDatabaseException(e): never {
        throw new DatabaseException({
            code: e.code,
            message: DatabaseErrorMessages[e.code] || e.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
