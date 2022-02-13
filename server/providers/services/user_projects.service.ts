import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Projects } from 'server/entities/user-projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class User_ProjectsService {
  constructor(
    @InjectRepository(User_Projects)
    private user_projectsRepository: Repository<User_Projects>,
  ) {}

  findProjectsByUserId(userId: number): Promise<User_Projects[]> {
    const ups = this.user_projectsRepository.find({
      where: { userId },
    });
    return ups;
  }

  findUsersByProjectId(projectId: number): Promise<User_Projects[]> {
    return this.user_projectsRepository.find({
      where: { projectId },
    });
  }

  findProjectLeadByProjectId(projectId: number): Promise<User_Projects> {
    return this.user_projectsRepository.find({
      where: { projectId, isProjectLead: true },
    })[0];
  }

  create(user_project: User_Projects): Promise<User_Projects> {
    return this.user_projectsRepository.save(user_project);
  }
}
