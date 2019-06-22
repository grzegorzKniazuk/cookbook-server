import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CategoryModule,
        IngredientModule,
    ],
    providers: [],
})
export class AppModule {
}
