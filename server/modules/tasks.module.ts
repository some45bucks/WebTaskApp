import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskController } from "server/controllers/api/tasks.controller";
import { Task } from "server/entities/tasks.entity";
import { TasksService } from "server/providers/services/tasks.service";

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TaskController],
    providers: [TasksService],
    exports: [],
})
export class TasksModule { }