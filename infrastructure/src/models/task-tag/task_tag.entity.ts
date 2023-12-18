import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { Tag } from '../tag/tag.entity';
import { Task } from '../task/task.entity';

@Entity()
export class TaskTag {
  @PrimaryColumn()
  task_id: number;

  @PrimaryColumn()
  tag_id: number;

  @ManyToOne(() => Task, task => task.task_id)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => Tag, tag => tag.tag_id)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
