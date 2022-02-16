import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { User_Project } from 'server/entities/user_projects.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';
import { User_ProjectsService } from 'server/providers/services/user_projects.service';

class emailBody 
{
  email: string;
}

@Controller()
export class projectController {
  constructor(
    private projectService: ProjectsService,
    private user_projectService: User_ProjectsService,
    private userService: UsersService,
  ) {}

  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const projects = await this.user_projectService.findProjectsByUserId(jwtBody.userId);

    return { projects };
  }

  @Get('/projects/:id/default')
  public async getDefaultUsers(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectService.findProjectById(parseInt(id,10));

    const users = await this.user_projectService.findUsersByProjectId(project.id);

    return { users };
  }

  @Get('/projects/:id/lead')
  public async getleadUser(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectService.findProjectById(parseInt(id,10));

    const userP = (await this.user_projectService.findProjectLeadByProjectId(project.id))[0];
    const lead = await this.userService.find(userP.userId);

    return { lead };
  }

  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto) {
    let project = new Project();
    project.name = "blank";
    let user_projects = new User_Project();

    user_projects.project = project;
    user_projects.userId = jwtBody.userId;
    user_projects.isProjectLead = true;

    await this.projectService.createProject(project);
    await this.user_projectService.create(user_projects);

    return { project };
  }

  @Post('/projects/:id')
  public async addUserToProject(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() emailBod: emailBody) {
console.log("madeit");

    const user_projects = new User_Project();
    const otherUser = await this.userService.findBy({
      where: { email: emailBod.email },
    });

    if(!otherUser)
    {
      return { success: false };
    }

    const project = await this.projectService.findProjectById(parseInt(id, 10));

    if ((await this.user_projectService.findProjectLeadByProjectId(project.id))[0].id !== jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }

    user_projects.projectId = project.id;
    user_projects.userId = otherUser.id;
    user_projects.isProjectLead = false;

    await this.user_projectService.create(user_projects);

    return { success: true };
  }
}
