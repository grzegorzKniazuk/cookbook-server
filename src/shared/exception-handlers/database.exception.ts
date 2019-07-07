import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../interfaces';

export class DatabaseException extends HttpException {

    constructor(response: ExceptionResponse, status: HttpStatus) {
        super(response, status);
    }
}
