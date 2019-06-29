import { HttpModule, Module } from '@nestjs/common';
import { PhotoUploadController } from './photo-upload.controller';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        PhotoUploadController,
    ],
})
export class PhotoUploadModule {

}
