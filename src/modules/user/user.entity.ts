import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureName } from '../../shared/enums';
import { RoleEntity } from '../role/role.entity';

@Entity(FeatureName.USER)
export class UserEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => RoleEntity, (entity: RoleEntity) => entity.id, { nullable: false, eager: true })
    @JoinColumn({ name: 'role_id' })
    public role_id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public date: Date;

    @Column('varchar', { length: 45, nullable: false, unique: true })
    public name: string;

    @Column('varchar', { length: 60, nullable: false })
    public password: string;
}
