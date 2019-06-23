import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { DifficultyModule } from './modules/difficulty/difficulty.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CategoryModule,
        IngredientModule,
        DifficultyModule,
    ],
    providers: [],
})
export class AppModule {
}
