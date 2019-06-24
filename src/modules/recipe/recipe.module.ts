import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { ImageUploadMiddleware } from '../../shared/middleware';
import { FeatureName } from '../../shared/enums';

@Module({
  imports: [
      TypeOrmModule.forFeature([ RecipeEntity ]),
  ],
  providers: [
      RecipeService,
  ],
  controllers: [
      RecipeController,
  ],
})
export class RecipeModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(ImageUploadMiddleware).forRoutes({ path: FeatureName.RECIPE, method: RequestMethod.ALL });
    }
}
