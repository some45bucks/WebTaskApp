import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { projectController } from 'server/controllers/api/project.controller';
import { Project } from 'server/entities/project.entity';
import { Task } from 'server/entities/tasks.entity';
import { User_Projects } from 'server/entities/user_projects.entity';
import { User } from 'server/entities/user.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { TasksService } from 'server/providers/services/tasks.service';
import { UsersService } from 'server/providers/services/users.service';
import { User_ProjectsService } from 'server/providers/services/user_projects.service';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task, User_Projects]), UsersModule],
  controllers: [projectController],
  providers: [ProjectsService, TasksService, User_ProjectsService, UsersService],
  exports: [],
})
export class ProjectModule {}
