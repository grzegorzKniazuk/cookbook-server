import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';
import { RecipeEntity } from '../recipe/recipe.entity';

@Entity(FeatureName.INGREDIENT)
export class IngredientEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;

    @ManyToMany(() => RecipeEntity, (recipe: RecipeEntity) => recipe.ingredients)
    @JoinTable({ name: 'recipe_has_ingredient', joinColumn: { name: 'ingredient_id' }, inverseJoinColumn: { name: 'recipe_id' } })
    public recipes: RecipeEntity[];
}
