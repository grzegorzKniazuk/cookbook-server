import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe')
export class RecipeEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('int', { nullable: false })
    public user_id: number;

    @Column('int', { nullable: false })
    public status_id: number;

    @Column('int', { nullable: false })
    public difficulty_id: number;

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
