import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './tasks.entity';
import { User_Project } from './user_projects.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User_Project, (userProject) => userProject.projectId)
  userProject: User_Project[];

  @OneToMany(() => Task, (task) => task.projectId)
  tasks: Task[];
}
