import { Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FeatureName } from '../../shared/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExceptionResponse } from '../../shared/interfaces';
import { diskStorage } from 'multer';
import { ImageUploadPath } from '../../shared/constants';

@Controller(FeatureName.UPLOAD)
export class PhotoUploadController {

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: function (request, file, callback) {
                callback(null, ImageUploadPath);
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

    @Get(':imgpath')
    public getPhoto(@Param('imgpath') filename: string, @Res() response): void {
        return response.sendFile(filename, { root: 'uploads' });
    }
}
