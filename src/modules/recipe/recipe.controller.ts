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

    @Get(':userId')
    public async fetch(@Param('userId') userId: number): Promise<RecipeEntity[]> {
        return await this.recipeService.findAll(userId);
    }

    @Post()
    public async save(@Body() { userId, recipe }): Promise<RecipeEntity> {
        return await this.recipeService.create(userId, recipe);
    }

    @Put(':recipeId')
    public async update(@Param('recipeId') recipeId: number, @Body() { userId, recipe }): Promise<UpdateResult> {
        return await this.recipeService.update(userId, recipeId, recipe);
    }

    @Delete(':userId/:recipeId')
    public async delete(@Param('userId') userId: number, @Param('recipeId') recipeId: number): Promise<DeleteResult> {
        return await this.recipeService.delete(userId, recipeId);
    }
}
