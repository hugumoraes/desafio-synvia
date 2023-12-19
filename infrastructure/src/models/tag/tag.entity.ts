/* ---------- External ---------- */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

/* ---------- Entities ---------- */
import { Task } from '../task/task.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
    unique: true,
  })
  tag_name: string;

  @Column('varchar', {
    length: 9,
    nullable: false,
  })
  tag_color: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Task, { cascade: true })
  @JoinTable({
    name: 'task_tag',
    inverseJoinColumn: {
      name: 'task_id',
      referencedColumnName: 'task_id',
    },
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'tag_id',
    },
  })
  tasks: Task[];
}
