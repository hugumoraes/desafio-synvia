import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Task } from '../task/task.entity';

@Entity({ name: 'person' })
export class Person {
  @PrimaryGeneratedColumn()
  person_id: number;

  @Column('varchar', {
    length: 255,
  })
  person_name: string;

  @Column('varchar', {
    length: 255,
  })
  person_email: string;

  @Column('varchar', {
    length: 255,
  })
  person_phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Task, task => task.person)
  task: Task[];
}
