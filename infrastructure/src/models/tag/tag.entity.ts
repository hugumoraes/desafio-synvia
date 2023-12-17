import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
