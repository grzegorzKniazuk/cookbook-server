import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeatureName } from '../../shared/enums';
import { RecipeService } from './recipe.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RecipeEntity } from './recipe.entity';

@Controller(FeatureName.RECIPE)
export class RecipeController {

    constructor(
        private readonly recipeService: RecipeService,
    ) {
    }

    @Get()
    public fetch(): Promise<RecipeEntity[]> {
        return this.recipeService.findAll();
    }

    @Post()
    public save(@Body() recipe: Partial<RecipeEntity>): Promise<RecipeEntity> {
        return this.recipeService.create(recipe);
    }

    @Put(':id')
    public update(@Param('id') id, @Body() recipe: RecipeEntity): Promise<UpdateResult> {
        return this.recipeService.update(id, recipe);
    }

    @Delete(':id')
    public delete(@Param('id') id): Promise<DeleteResult> {
        return this.recipeService.delete(id);
    }
}
