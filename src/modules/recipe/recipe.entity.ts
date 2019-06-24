import { Column, Entity, Index, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { IngredientEntity } from '../ingredient/ingredient.entity';
import { DifficultyEntity } from '../difficulty/difficulty.entity';

@Entity('recipe')
export class RecipeEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('int', { nullable: false })
    @Index()
    public user_id: number;

    @Column('int', { nullable: false })
    public status_id: number;

    @OneToMany(() => DifficultyEntity, (difficulty: DifficultyEntity) => difficulty.id)
    public difficulty_id: number;

    @ManyToMany(() => CategoryEntity, (category: CategoryEntity) => category.id)
    public categories: number[];

    @ManyToMany(() => IngredientEntity, (ingredient: IngredientEntity) => ingredient.id)
    public ingredients: number[];

    @Column('varchar', { length: 60, nullable: false, unique: true })
    public name: string;

    @Column('varchar', { length: 60 })
    public photo_url: string;

    @Column('varchar', { length: 200, nullable: false })
    public ingredient_description: string;

    @Column('varchar', { length: 200, nullable: false })
    public preparation_description: string;

    @Column('varchar', { length: 45, nullable: false })
    public time: string;
}
