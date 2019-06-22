import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;
}
