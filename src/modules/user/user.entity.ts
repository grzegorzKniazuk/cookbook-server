import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';
import { RoleEntity } from '../role/role.entity';
import { RecipeEntity } from '../recipe/recipe.entity';

@Entity(FeatureName.USER)
export class UserEntity {

    @PrimaryGeneratedColumn()
    @OneToMany(() => RecipeEntity, (entity: RecipeEntity) => entity.user_id)
    public id: number;

    @ManyToOne(() => RoleEntity, (entity: RoleEntity) => entity.id, { nullable: false })
    @JoinColumn({ name: 'role_id' })
    public role_id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public date: Date;

    @Column('varchar', { length: 45, nullable: false, unique: true })
    public name: string;

    @Column('varchar', { length: 60, nullable: false })
    public password: string;
}
