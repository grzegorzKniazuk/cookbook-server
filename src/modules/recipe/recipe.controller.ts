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

    @Get(':id')
    public async fetch(@Param('id') id: number): Promise<RecipeEntity[]> {
        return await this.recipeService.findAll(id);
    }

    @Post()
    public async save(@Body() { userId, recipe }): Promise<RecipeEntity> {
        return await this.recipeService.create(userId, recipe);
    }

    @Put(':id')
    public update(@Param('id') id: number, @Body() recipe: RecipeEntity): Observable<UpdateResult> {
        return this.recipeService.update(id, recipe);
    }

    @Delete(':id')
    public delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.recipeService.delete(id);
    }
}
