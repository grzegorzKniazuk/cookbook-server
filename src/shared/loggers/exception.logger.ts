import { Logger } from '@nestjs/common';

export class ExceptionLogger extends Logger {
    public error(message: any, trace?: string, context?: string): void {
        const fs = require('fs');

        fs.writeFile(
            `../../../logs/exception-${new Date()}.txt`,
            `message: ${message}
            trace: ${trace}
            context: ${context}`,
            () => super.error(message, trace),
        );
    }
}
