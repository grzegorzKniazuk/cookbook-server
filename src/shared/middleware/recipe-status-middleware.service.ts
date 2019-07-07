import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RecipeStatus } from '../enums';

@Injectable()
export class RecipeStatusMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: () => void): any {
        req.body = {
            ...req.body,
            recipe: {
                ...req.body.recipe,
                status: {
                    id: RecipeStatus.ACCEPTED,
                    name: 'accepted',
                },
            },
        };
        next();
    }
}
