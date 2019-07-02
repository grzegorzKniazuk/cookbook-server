import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FeatureName } from '../../shared/enums';
import { RecipeService } from './recipe.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RecipeEntity } from './recipe.entity';
import { Observable } from 'rxjs';

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

    @Put(':id')
    public async update(@Param('id') id: number, @Body() recipe: RecipeEntity): Promise<UpdateResult> {
        return await this.recipeService.update(id, recipe);
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.recipeService.delete(id);
    }
}
