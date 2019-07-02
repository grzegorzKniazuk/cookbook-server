import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FeatureName } from '../../shared/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExceptionResponse } from '../../shared/interfaces';
import { diskStorage } from 'multer';
import { ImagePath } from '../../shared/constants';

@Controller(FeatureName.PHOTO)
export class PhotoController {

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: function (request, file, callback) {
                callback(null, ImagePath);
            },
            filename: function (request, file, callback) {
                const extension = file.originalname.split('.').pop();
                callback(null, `${new Date().getTime()}.${extension}`);
            },
        }),
    }))
    public uploadPhoto(@UploadedFile() { filename, mimetype }): { filename: string } {
        if (mimetype.startsWith('image')) {
            return { filename };
        } else {
            const response: ExceptionResponse = { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'Nieobsługiwany format pliku' };

            throw new HttpException(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
    }

    @Get(':filename')
    public getPhoto(@Param('filename') filename: string, @Res() response) {
        const fileSystem = require('fs');
        const extensions = [ 'jpg', 'jpeg', 'gif', 'bmp', 'png' ];

        try {
            extensions.forEach((extension: string) => {
                if (fileSystem.existsSync(`${ImagePath}/${filename}.${extension}`)) {
                    return response.sendFile(`${filename}.${extension}`, { root: ImagePath });
                }
            });
        } catch (e) {
            throw new InternalServerErrorException(response, `Nie znaleziono pliku o nazwie ${filename}`);
        }
    }
}
