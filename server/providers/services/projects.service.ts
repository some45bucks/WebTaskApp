import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'server/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findProjectById(id: number): Promise<Project> {
    return this.projectRepository.findOne(id);
  }

  createProject(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }
}
