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

    @Get()
    public fetch(): Observable<RecipeEntity[]> {
        return this.recipeService.findAll();
    }

    @Post()
    public save(@Body() recipe: Partial<RecipeEntity>): Observable<RecipeEntity> {
        return this.recipeService.create(recipe);
    }

    @Put(':id')
    public update(@Param('id') id, @Body() recipe: RecipeEntity): Observable<UpdateResult> {
        return this.recipeService.update(id, recipe);
    }

    @Delete(':id')
    public delete(@Param('id') id): Observable<DeleteResult> {
        return this.recipeService.delete(id);
    }
}
