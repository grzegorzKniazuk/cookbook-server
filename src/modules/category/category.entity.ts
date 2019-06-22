import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;
}
