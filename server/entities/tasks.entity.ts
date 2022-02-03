import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  projectId: number;

  @Column({ nullable: false })
  title: Text;

  @Column({ nullable: false })
  description: Text;

  @Column({ nullable: false })
  timeEst: number;

  @Column({ nullable: false })
  status: boolean;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
