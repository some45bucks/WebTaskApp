import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { User_Projects } from 'server/entities/user_projects.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';
import { User_ProjectsService } from 'server/providers/services/user_projects.service';

@Controller()
export class projectController {
  constructor(
    private projectService: ProjectsService,
    //private user_projectService: User_ProjectsService,
    //private userService: UsersService,
  ) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    //const projects = await this.user_projectService.findProjectsByUserId(jwtBody.userId);

    return {  };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto) {
    const project = new Project();
    project.name = "blank";
    const user_projects = new User_Projects();

    user_projects.projectId = project.id;
    user_projects.userId = jwtBody.userId;
    user_projects.isProjectLead = true;

    await this.projectService.createProject(project);
    //await this.user_projectService.create(user_projects);

    return { project };
  }

//   @Post('/projects/:id')
//   public async addUserToProject(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() email: string) {
//     console.log('made it3');
//     const user_projects = new User_Projects();
//     const otherUser = await this.userService.findBy({
//       where: { email },
//     });
//     const project = await this.projectService.findProjectById(parseInt(id, 10));

//     if ((await this.user_projectService.findProjectLeadByProjectId(project.id)).id !== jwtBody.userId) {
//       throw new HttpException('Unauthorized', 401);
//     }

//     user_projects.projectId = project.id;
//     user_projects.userId = otherUser.id;
//     user_projects.isProjectLead = false;

//     await this.user_projectService.create(user_projects);

//     return { success: true };
//   }
}
