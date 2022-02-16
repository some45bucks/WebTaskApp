import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Project } from 'server/entities/user_projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class User_ProjectsService {
  constructor(
    @InjectRepository(User_Project)
    private user_projectsRepository: Repository<User_Project>,
  ) {}

  findProjectsByUserId(userId: number): Promise<User_Project[]> {
    const ups = this.user_projectsRepository.find({
      where: { userId },
    });
    return ups;
  }

  findUsersByProjectId(projectId: number): Promise<User_Project[]> {
    return this.user_projectsRepository.find({
      where: { projectId },
    });
  }

  findProjectLeadByProjectId(projectId: number): Promise<User_Project[]> {

    return this.user_projectsRepository.find({
      where: { projectId, isProjectLead: true },
    });
  }

  create(user_project: User_Project): Promise<User_Project> {
    return this.user_projectsRepository.save(user_project);
  }
}
