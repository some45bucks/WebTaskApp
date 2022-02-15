import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { RefreshToken } from './refresh_token.entity';
import { Task } from './tasks.entity';
import { User_Projects } from './user-projects.entity';
import { UserRole } from './user_role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];

  @OneToMany(() => User_Projects, (userProjects) => userProjects.userId)
  userProjects: User_Projects[];

  @OneToMany(() => Task, (task) => task.userId)
  tasks: Task[];
}
