import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class IngredientService {

    constructor(
        @InjectRepository(IngredientEntity) private readonly ingredientRepository: Repository<IngredientEntity>,
    ) {
    }

    public async findAll(): Promise<IngredientEntity[]> {
        return await this.ingredientRepository.find();
    }

    public async create(ingredient: Partial<IngredientEntity>): Promise<IngredientEntity> {
        return await this.ingredientRepository.save(ingredient);
    }

    public async update(id: number, ingredient: IngredientEntity): Promise<UpdateResult> {
        return await this.ingredientRepository.update(id, ingredient);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.ingredientRepository.delete(id);
    }
}
