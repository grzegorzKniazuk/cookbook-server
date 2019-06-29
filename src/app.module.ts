import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { DifficultyModule } from './modules/difficulty/difficulty.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { StatusModule } from './modules/status/status.module';
import { PhotoModule } from './modules/photo/photo.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CacheModule.register(),
        CategoryModule,
        IngredientModule,
        DifficultyModule,
        RecipeModule,
        RoleModule,
        UserModule,
        StatusModule,
        PhotoModule,
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    ],
})
export class AppModule {
}
