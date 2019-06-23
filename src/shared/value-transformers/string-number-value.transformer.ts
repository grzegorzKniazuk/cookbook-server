import { ValueTransformer } from 'typeorm';

export class StringNumberValueTransformer implements ValueTransformer {
    public from(value: string): number {
        return +value;
    }

    public to(value: number): string {
        return `${value}`;
    }

}
