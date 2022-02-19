import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { Project } from 'server/entities/project.entity';
import { User_Project } from 'server/entities/user_projects.entity';
import { ProjectsService } from 'server/providers/services/projects.service';
import { UsersService } from 'server/providers/services/users.service';
import { User_ProjectsService } from 'server/providers/services/user_projects.service';

//how the email is sent through
class emailBody {
  email: string;
}

//how the project name is sent through
class projectNameBody {
  name: string;
}

@Controller()
export class projectController {
  constructor(
    private projectService: ProjectsService,
    private user_projectService: User_ProjectsService,
    private userService: UsersService,
  ) {}

  //This will return a list of project objects
  @Get('/projects')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const projectsU = await this.user_projectService.findProjectsByUserId(jwtBody.userId);

    const projects = [];
    let count = 0;

    //converts from connections to actual project objects
    for (const item of projectsU) {
      const hold = await this.projectService.findProjectById(item.projectId);

      projects[count] = hold;

      count++;
    }

    return { projects };
  }

  //This will return all users under a single project and it will throw a 404 if the project doesn't exist
  @Get('/projects/:id/default')
  public async getDefaultUsers(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectService.findProjectById(parseInt(id, 10));

    //makes sure project exists
    if (project) {
      const users = [];
      let count = 0;

      const usersP = await this.user_projectService.findUsersByProjectId(project.id);

      //converts from connections to actual user objects
      for (const item of usersP) {
        const hold = await this.userService.find(item.userId);

        users[count] = hold;

        count++;
      }

      return { users };
    }

    throw new HttpException('Project does not exist', 404);
  }

  //gets the lead user object and throws a 404 if project dosen't exist
  @Get('/projects/:id/lead')
  public async getleadUser(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto) {
    const project = await this.projectService.findProjectById(parseInt(id, 10));

    //makes sure project exists
    if (project) {
      const userP = (await this.user_projectService.findProjectLeadByProjectId(project.id))[0];

      //converts from connection to actual user object
      const lead = await this.userService.find(userP.userId);

      return { lead };
    }

    throw new HttpException('Project does not exist', 404);
  }

  // creates a new project with a name
  @Post('/projects')
  public async create(@JwtBody() jwtBody: JwtBodyDto, @Body() nameBod: projectNameBody) {
    //create project
    const project = new Project();
    project.name = nameBod.name;

    //create user_project connection
    const user_projects = new User_Project();
    user_projects.project = project;
    user_projects.userId = jwtBody.userId;
    user_projects.isProjectLead = true;

    await this.projectService.createProject(project);
    await this.user_projectService.create(user_projects);

    return { project };
  }

  //Lets you add users onto a project with a email string
  @Post('/projects/:id')
  public async addUserToProject(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() emailBod: emailBody) {
    const project = await this.projectService.findProjectById(parseInt(id, 10));

    //makes sure project exists
    if (project) {
      //Finds by email
      const otherUser = await this.userService.findBy({
        where: { email: emailBod.email },
      });

      //Makes sure it exists
      if (!otherUser) {
        return { success: false, reason: 'Other User Dosent exist' };
      }

      //checks to see if user is in project already
      const projectCheck = await this.user_projectService.findUsersByProjectId(parseInt(id, 10));
      let projectCheckSucc = false;
      projectCheck.forEach((item) => {
        if (item.userId == otherUser.id) {
          projectCheckSucc = true;
        }
      });

      if (projectCheckSucc) {
        return { success: false, reason: 'User Already On Project' };
      }

      //makes sure user is the lead
      const leadCheck = await this.user_projectService.findProjectLeadByProjectId(project.id);

      if (leadCheck[0].userId !== jwtBody.userId) {
        throw new HttpException('Unauthorized', 401);
      }

      //create new user_project connection
      const user_projects = new User_Project();
      user_projects.projectId = project.id;
      user_projects.userId = otherUser.id;
      user_projects.isProjectLead = false;

      await this.user_projectService.create(user_projects);

      return { success: true, reason: '' };
    }
    throw new HttpException('Project does not exist', 404);
  }
}
