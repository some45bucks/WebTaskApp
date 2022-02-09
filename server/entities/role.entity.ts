import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { UserRole } from './user_role.entity';

// Make sure to add aditional roles here then reseed
export enum RoleKey {
  ADMIN = 'admin',
  USER = 'user',
  TEAM_LEAD = 'team_lead',
}

@Entity()
export class Role {
  static ROLES = [RoleKey.ADMIN, RoleKey.USER, RoleKey.TEAM_LEAD];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: RoleKey;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
