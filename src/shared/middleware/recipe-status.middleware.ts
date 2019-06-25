import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RecipeStatusMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: () => void): any {

    }
}
