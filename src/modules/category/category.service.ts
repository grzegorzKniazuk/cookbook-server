import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    ) {
    }

    public async findAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find();
    }

    public async create(category: Partial<CategoryEntity>): Promise<CategoryEntity> {
        return await this.categoryRepository.save(category);
    }

    public async update(category: CategoryEntity): Promise<UpdateResult> {
        return await this.categoryRepository.update(category.id, category);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.delete(id);
    }
}
