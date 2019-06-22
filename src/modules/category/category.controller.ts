import { Body, Controller, Post } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ) {
    }

    @Post()
    public save(@Body() category: Partial<CategoryEntity>): Promise<CategoryEntity> {
        return this.categoryService.create(category);
    }
}
