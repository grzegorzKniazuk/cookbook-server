import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';
import { RecipeEntity } from '../recipe/recipe.entity';

@Entity(FeatureName.DIFFICULTY)
export class DifficultyEntity {

    @PrimaryGeneratedColumn()
    @OneToMany(() => RecipeEntity, (entity: RecipeEntity) => entity.difficulty)
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;
}
