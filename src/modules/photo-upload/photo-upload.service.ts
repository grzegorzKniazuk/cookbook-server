import { HttpService, Injectable } from '@nestjs/common';
import { PhotoDto } from './photo.dto';
import { IMGUR_CLIENT_ID, IMGUR_URL } from '../../shared/constants';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PhotoUploadService {

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    public upload(photoDto: PhotoDto): Observable<AxiosResponse<any>> {
        const { data, name, type } = photoDto;
        console.log(data);
        console.log(name);
        console.log(type);



        return this.httpService.post(
            IMGUR_URL,
            { image: data, type, title: name },
            {
                headers: {
                    'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
                },
            },
        );
    }
}
