import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ IngredientEntity ]),
    ],
    controllers: [
        IngredientController,
    ],
    providers: [
        IngredientService,
    ],
})
export class IngredientModule {
}
