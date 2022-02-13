import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Tasks } from './tasks.entity';
import { User_Projects } from './user_projects.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToMany(() => User_Projects, (userProjects) => userProjects.projectId)
  userProjects: User_Projects[];

  @OneToMany(() => Tasks, (tasks) => tasks.projectId)
  tasks: Tasks[];
}
