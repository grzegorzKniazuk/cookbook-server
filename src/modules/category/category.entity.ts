import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public name: string;
}
