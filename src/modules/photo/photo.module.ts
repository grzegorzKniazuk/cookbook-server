import { HttpModule, Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        PhotoController,
    ],
})
export class PhotoModule {

}
