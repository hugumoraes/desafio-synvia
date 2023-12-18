import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Person } from '../person/person.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar', {
    length: 255,
  })
  user_login: string;

  @Column('varchar', {
    length: 255,
  })
  user_password: string;

  @Column({})
  person_id: number;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
