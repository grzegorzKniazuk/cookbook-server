import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface ApiService<T> {
    findAll: () => Observable<T[]>,
    create: (data: Partial<T>) => Observable<T>,
    update: (id: number, data: T) => Observable<UpdateResult>,
    delete: (id: number) => Observable<DeleteResult>,
}
