import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Person } from '../person/person.entity';
import { Status } from '../status/status.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column('text')
  task_description: string;

  @Column('varchar', {
    nullable: true,
  })
  task_title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Person, person => person.task)
  person: Person;

  @ManyToOne(() => Status, status => status.task)
  status: Status;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
