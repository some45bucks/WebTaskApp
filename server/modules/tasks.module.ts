import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskController } from "server/controllers/api/tasks.controller";
import { Task } from "server/entities/tasks.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TaskController],
    providers: [],
    exports: [],
})
export class TasksModule { }