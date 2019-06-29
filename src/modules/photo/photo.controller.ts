import { Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
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
    public uploadPhoto(@UploadedFile() { filename, mimetype }): { name: string } {
        if (mimetype.startsWith('image')) {
            const name = filename.split('.').shift();

            return { name };
        } else {
            const response: ExceptionResponse = { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'Nieobsługiwany format pliku' };

            throw new HttpException(response, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
    }

    @Get(':filename')
    public getPhoto(@Param('filename') filename: string, @Res() response) {
        return response.sendFile(`${filename}.jpg`, { root: ImagePath });
    }
}
