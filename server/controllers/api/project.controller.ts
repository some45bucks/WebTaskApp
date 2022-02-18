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
    const projectsU = await this.user_projectService.findProjectsByUserId(jwtBody.userId);

    let projects = [];
    let count = 0;

    for (const item of projectsU) 
    {
      const hold = await this.projectService.findProjectById(item.projectId);
      
      projects[count] = hold;
      
      count++;
    }
    return { projects };
  }

  @Get('/projects/:id/default')
  public async getDefaultUsers(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectService.findProjectById(parseInt(id,10));

    if(project)
    {

      let users = [];
      let count = 0;

      const usersP = await this.user_projectService.findUsersByProjectId(project.id);

      for (const item of usersP) 
      {
        const hold = await this.userService.find(item.userId);
        
        users[count] = hold;
        
        count++;
      }

      return { users };
    }
    return { users: [] };
  }

  @Get('/projects/:id/lead')
  public async getleadUser(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectService.findProjectById(parseInt(id,10));
    if(project)
    {
      const userP = (await this.user_projectService.findProjectLeadByProjectId(project.id))[0];
      const lead = await this.userService.find(userP.userId);

      return { lead };
    }

    return { lead: undefined };
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

console.log(project);

    return { project };
  }

  @Post('/projects/:id')
  public async addUserToProject(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() emailBod: emailBody) {
    const user_projects = new User_Project();
    const otherUser = await this.userService.findBy({
      where: { email: emailBod.email },
    });

    if(!otherUser)
    {
      return { success: false };
    }

    const projectCheck = await this.user_projectService.findUsersByProjectId(parseInt(id,10));

    let projectCheckSucc = false;

    projectCheck.forEach((item)=>{
      if(item.userId == otherUser.id)
      {
        projectCheckSucc = true;
      }
    })

    if(projectCheckSucc)
    {
      return { success: false };
    }

    const project = await this.projectService.findProjectById(parseInt(id, 10));
    const leadCheck = await this.user_projectService.findProjectLeadByProjectId(project.id);

    if (!leadCheck[0].isProjectLead) {
      throw new HttpException('Unauthorized', 401);
    }

    user_projects.projectId = project.id;
    user_projects.userId = otherUser.id;
    user_projects.isProjectLead = false;

    await this.user_projectService.create(user_projects);

    return { success: true };
  }
}
