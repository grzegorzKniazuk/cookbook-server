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
    @UseInterceptors(FileInterceptor('image'))
    public upload(@UploadedFile() file): Observable<AxiosResponse<any>> {
        const { fieldname, originalname, encoding, mimetype, buffer, size } = file;

        if (mimetype.startsWith('image')) {
            var fs = require('fs');
            const canvas = new Can
            var data = canvas.toDataURL(buffer).replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            fs.writeFile(`${ImageUploadPath}/${originalname}`, buf);
        } else {
            const response: ExceptionResponse = { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'Nieobsługiwany format pliku' };

            throw new HttpException(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
    }
}
