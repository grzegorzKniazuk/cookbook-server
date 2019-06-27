import { Body, Controller, Post } from '@nestjs/common';
import { FeatureName } from '../../shared/enums';
import { PhotoDto } from './photo.dto';
import { PhotoUploadService } from './photo-upload.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller(FeatureName.UPLOAD)
export class PhotoUploadController {

    constructor(
        private readonly photoUploadService: PhotoUploadService,
    ) {
    }

    @Post()
    public upload(@Body() photoDto: PhotoDto): Observable<AxiosResponse<any>> {
        return this.photoUploadService.upload(photoDto);
    }
}
