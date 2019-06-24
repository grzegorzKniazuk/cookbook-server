import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';
import { RecipeEntity } from '../recipe/recipe.entity';

@Entity(FeatureName.STATUS)
export class StatusEntity {

    @PrimaryGeneratedColumn()
    @OneToMany(() => RecipeEntity, (entity: RecipeEntity) => entity.difficulty_id)
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;
}
