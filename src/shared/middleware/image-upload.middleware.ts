import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ImageUploadMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: () => void): void {
        console.log(req.body);
        next();
    }
}
