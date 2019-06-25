import { CategoryDto } from '../category/category.dto';
import { IngredientDto } from '../ingredient/ingredient.dto';

export class RecipeDto {
    public readonly id: number;
    public readonly status_id: number;
    public readonly difficulty_id: number;
    public readonly name: string;
    public readonly photo_url: string;
    public readonly categories: CategoryDto[];
    public readonly ingredients: IngredientDto[];
    public readonly ingredient_description: string;
    public readonly recipe_description: string;
    public readonly time: string;
}
