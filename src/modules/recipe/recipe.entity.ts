import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DifficultyEntity } from '../difficulty/difficulty.entity';
import { UserEntity } from '../user/user.entity';
import { StatusEntity } from '../status/status.entity';
import { FeatureName } from '../../shared/enums';
import { CategoryEntity } from '../category/category.entity';
import { IngredientEntity } from '../ingredient/ingredient.entity';

@Entity(FeatureName.RECIPE)
export class RecipeEntity {

    @ManyToMany(() => UserEntity, (entity: UserEntity) => entity.id, { nullable: false })
    @PrimaryGeneratedColumn()
    public id: number;

    @Index()
    @ManyToOne(() => UserEntity, (entity: UserEntity) => entity.id, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    public user_id: number;

    @ManyToOne(() => StatusEntity, (entity: StatusEntity) => entity.id, { nullable: false })
    @JoinColumn({ name: 'status_id' })
    public status: StatusEntity;

    @ManyToOne(() => DifficultyEntity, (entity: DifficultyEntity) => entity.id, { nullable: false })
    @JoinColumn({ name: 'difficulty_id' })
    public difficulty: DifficultyEntity;

    @ManyToMany(() => CategoryEntity, (category: CategoryEntity) => category.recipes, { nullable: false })
    @JoinTable({ name: 'recipe_has_category', joinColumn: { name: 'recipe_id' }, inverseJoinColumn: { name: 'category_id' } })
    public categories: CategoryEntity[];

    @ManyToMany(() => IngredientEntity, (ingredient: IngredientEntity) => ingredient.recipes, { nullable: false })
    @JoinTable({ name: 'recipe_has_ingredient', joinColumn: { name: 'recipe_id' }, inverseJoinColumn: { name: 'ingredient_id' } })
    public ingredients: IngredientEntity[];

    @Column('varchar', { length: 60, nullable: false, unique: true })
    public name: string;

    @Column('varchar', { length: 60 })
    public photo_id: string;

    @Column('varchar', { length: 200, nullable: false })
    public ingredient_description: string;

    @Column('varchar', { length: 200, nullable: false })
    public recipe_description: string;

    @Column('varchar', { length: 200, nullable: true })
    public sources_description: string;

    @Column('varchar', { length: 45, nullable: false })
    public time: string;

    @Column('boolean', { default: false })
    public favorite: boolean;
}
