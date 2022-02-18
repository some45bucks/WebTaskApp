import { Controller, Get } from "@nestjs/common";

@Controller()
export class TaskController {
    @Get('/tasks')
    public index() {
        return { message: 'Hello World' }
    }
}