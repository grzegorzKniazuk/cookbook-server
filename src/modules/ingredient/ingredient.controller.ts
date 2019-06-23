import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IngredientEntity } from './ingredient.entity';
import { FeatureName } from '../../shared/enums';
import { Observable } from 'rxjs';

@Controller(FeatureName.INGREDIENT)
export class IngredientController {

    constructor(
        private readonly ingredientService: IngredientService,
    ) {
    }

    @Get()
    public fetch(): Observable<IngredientEntity[]> {
        return this.ingredientService.findAll();
    }

    @Post()
    public save(@Body() ingredient: Partial<IngredientEntity>): Observable<IngredientEntity> {
        return this.ingredientService.create(ingredient);
    }

    @Put(':id')
    public update(@Param('id') id, @Body() ingredient: IngredientEntity): Observable<UpdateResult> {
        return this.ingredientService.update(id, ingredient);
    }

    @Delete(':id')
    public delete(@Param('id') id): Observable<DeleteResult> {
        return this.ingredientService.delete(id);
    }
}
