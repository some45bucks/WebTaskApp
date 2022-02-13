import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from 'server/entities/tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
  ) {}

  findTasksById(id: number): Promise<Tasks> {
    return this.tasksRepository.findOne(id);
  }

  findTasksByProject(projectId: number): Promise<Tasks[]> {
    return this.tasksRepository.find({
      where: { projectId },
    });
  }

  findTasksByUser(userId: number): Promise<Tasks[]> {
    return this.tasksRepository.find({
      where: { userId },
    });
  }

  createTasks(tasks: Tasks): Promise<Tasks> {
    return this.tasksRepository.save(tasks);
  }
}
