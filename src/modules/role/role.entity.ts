import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';
import { UserEntity } from '../user/user.entity';

@Entity(FeatureName.ROLE)
export class RoleEntity {

    @PrimaryGeneratedColumn()
    @OneToMany(() => UserEntity, (entity: UserEntity) => entity.role_id)
    public id: number;

    @Column('varchar', { length: 45, nullable: false, unique: true })
    public name: string;
}
