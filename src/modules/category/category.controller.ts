import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeatureName } from '../../shared/enums';

@Controller(FeatureName.CATEGORY)
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ) {
    }

    @Get()
    public fetch(): Promise<CategoryEntity[]> {
        return this.categoryService.findAll();
    }

    @Post()
    public save(@Body() category: Partial<CategoryEntity>): Promise<CategoryEntity> {
        return this.categoryService.create(category);
    }

    @Put(':id')
    public update(@Param('id') id, @Body() category: CategoryEntity): Promise<UpdateResult> {
        return this.categoryService.update(id, category);
    }

    @Delete(':id')
    public delete(@Param('id') id): Promise<DeleteResult> {
        return this.categoryService.delete(id);
    }
}
