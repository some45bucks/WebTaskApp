import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class User_Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  projectId: number;

  @Column({ nullable: false })
  isProjectLead: boolean;

  @ManyToOne(() => User, (user) => user.userProject)
  user: User;

  @ManyToOne(() => Project, (project) => project.userProject)
  project: Project;
}
