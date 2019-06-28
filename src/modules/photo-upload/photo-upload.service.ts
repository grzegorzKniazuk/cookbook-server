import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

const request = require('request').defaults({
    json: true,
});

@Injectable()
export class PhotoUploadService {

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    public upload(): Observable<AxiosResponse<any>> {
        /*
        const { data, name, type } = photoDto;
        console.log(name);
        console.log(type);

        return this.httpService.post(
            IMGUR_URL,
            { image: data, type, title: name },
            {
                url: IMGUR_URL,
                method: 'POST',
                headers: {
                    'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
                },
            },
        );
        */
    }
}
