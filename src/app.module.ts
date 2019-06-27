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
import { PhotoUploadModule } from './modules/photo-upload/photo-upload.module';

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
        PhotoUploadModule,
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
    ],
})
export class AppModule {
}
