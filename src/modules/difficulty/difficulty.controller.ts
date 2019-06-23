import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DifficultyEntity } from './difficulty.entity';
import { FeatureName } from '../../shared/enums';
import { Observable } from 'rxjs';

@Controller(FeatureName.DIFFICULTY)
export class DifficultyController {

    constructor(
        private readonly difficultyService: DifficultyService,
    ) {
    }

    @Get()
    public fetch(): Observable<DifficultyEntity[]> {
        return this.difficultyService.findAll();
    }

    @Post()
    public save(@Body() difficultyLevel: Partial<DifficultyEntity>): Observable<DifficultyEntity> {
        return this.difficultyService.create(difficultyLevel);
    }

    @Put(':id')
    public update(@Param('id') id, @Body() difficultyLevel: DifficultyEntity): Observable<UpdateResult> {
        return this.difficultyService.update(id, difficultyLevel);
    }

    @Delete(':id')
    public delete(@Param('id') id): Observable<DeleteResult> {
        return this.difficultyService.delete(id);
    }
}
