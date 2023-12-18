import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
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
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @ManyToOne(() => Status, status => status.task)
  @JoinColumn({ name: 'task_status_id' })
  status: Status;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'task_tag',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'task_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'tag_id',
    },
  })
  tags: Tag[];
}
