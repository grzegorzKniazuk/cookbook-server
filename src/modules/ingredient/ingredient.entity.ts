import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';

@Entity(FeatureName.INGREDIENT)
export class IngredientEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;
}
