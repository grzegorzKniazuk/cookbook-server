import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(('difficulty'))
export class DifficultyEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', { length: 45, unique: true, nullable: false })
    public name: string;
}
