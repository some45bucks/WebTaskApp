import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './tasks.entity';
import { User_Projects } from './user-projects.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User_Projects, (userProjects) => userProjects.projectId)
  userProjects: User_Projects[];

  @OneToMany(() => Task, (task) => task.projectId)
  tasks: Task[];
}
