import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';
import { RecipeEntity } from '../recipe/recipe.entity';

@Entity(FeatureName.CATEGORY)
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;

    @ManyToMany(() => RecipeEntity, (recipe: RecipeEntity) => recipe.categories)
    @JoinTable({ name: 'recipe_has_category', joinColumn: { name: 'category_id' }, inverseJoinColumn: { name: 'recipe_id' } })
    public recipes: RecipeEntity[];
}
