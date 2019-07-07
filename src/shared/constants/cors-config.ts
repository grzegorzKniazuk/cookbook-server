import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS_CONFIG: CorsOptions = {
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
};
