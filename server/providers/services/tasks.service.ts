import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'server/entities/tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findTasksById(id: number): Promise<Task> {
    return this.tasksRepository.findOne(id);
  }

  findTasksByProject(projectId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { projectId },
    });
  }

  //Prolly not useful for us
  findTasksByUser(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { userId },
    });
  }

  createTasks(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }
}
