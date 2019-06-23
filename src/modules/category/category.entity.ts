import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';

@Entity(FeatureName.CATEGORY)
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;
}
