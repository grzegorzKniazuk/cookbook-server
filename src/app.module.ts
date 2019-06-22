import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CategoryModule,
    ],
    providers: [],
})
export class AppModule {
}
