import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Task } from '../task/task.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  task_status_id: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  task_status_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Task, task => task.status)
  task: Task[];
}
