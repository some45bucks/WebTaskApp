import { Body, Controller, Get, Post } from "@nestjs/common";
import { JwtBody } from "server/decorators/jwt_body.decorator";
import { JwtBodyDto } from "server/dto/jwt_body.dto";
import { Task } from "server/entities/tasks.entity";
import { TasksService } from "server/providers/services/tasks.service";

class taskBody {
    userID: number;
    projectID: number;
    title: string;
    description: string;
    timeEst: number;
    status: boolean;
}

@Controller()
export class TaskController {
    constructor(private tasksService: TasksService) { }
    @Get('/tasks')
    public async index(@JwtBody() JwtBody: JwtBodyDto) {
        const tasks = await this.tasksService.findTasksByUser(JwtBody.userId)
        return { tasks };
    }

    @Post('/tasks')
    public async create(@JwtBody() JwtBody: JwtBodyDto, @Body() body: taskBody) {
        let task = new Task();
        task.userId = body.userID;
        task.projectId = body.projectID;
        task.title = body.title;
        task.description = body.description;
        task.timeEst = body.timeEst;
        task.status = body.status;

        task = await this.tasksService.createTasks(task);

        return { task }

    }
}