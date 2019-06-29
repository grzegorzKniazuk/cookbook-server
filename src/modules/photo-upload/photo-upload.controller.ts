import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FeatureName } from '../../shared/enums';
import { PhotoUploadService } from './photo-upload.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExceptionResponse } from '../../shared/interfaces';
import { diskStorage } from 'multer';
import { ImageUploadPath } from '../../shared/constants';

@Controller(FeatureName.UPLOAD)
export class PhotoUploadController {

    constructor(
        private readonly photoUploadService: PhotoUploadService,
    ) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: function (req, file, cb) {
                cb(null, ImageUploadPath);
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname);
            }
        })
    }))
    public upload(@UploadedFile() { mimetype }): Observable<AxiosResponse<any>> {
        if (mimetype.startsWith('image')) {

        } else {
            const response: ExceptionResponse = { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'Nieobsługiwany format pliku' };

            throw new HttpException(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
    }
}
