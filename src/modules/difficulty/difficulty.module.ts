import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DifficultyEntity } from './difficulty.entity';
import { DifficultyController } from './difficulty.controller';
import { DifficultyService } from './difficulty.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ DifficultyEntity ]),
    ],
    controllers: [
        DifficultyController,
    ],
    providers: [
        DifficultyService,
    ],
})
export class DifficultyModule {
}
