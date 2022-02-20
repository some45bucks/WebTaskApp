import { debug } from 'console';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { async, asyncScheduler } from 'rxjs';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Project } from './Project';
import { Task } from './Task';
import { User } from './User';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);

  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);
  const [focusProject, setFocusProject] = useState();
  const [focusUser, setFocusUser] = useState();
  const [lead, setlead] = useState({ firstName: 'Loading...' });
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState('');
  const [projectName, setProjectName] = useState('New Project');
  const [taskTitle, setTaskTitle] = useState('Task Title');
  const [taskTime, setTaskTime] = useState(10);
  const [taskDesc, setTaskDesc] = useState('Task Description');


  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };
  
  useEffect(async () => {
    resetProjects();
  }, []);
  
  const resetProjects = async () => {
    const { projects } = await api.get('/projects');
    setProjects(projects);
  };


  const createProject = async (projectName)=>{
    const projectNameBody = {
      name: projectName
    };
    const { project } = await api.post('/projects',projectNameBody);

    setProjects([...projects, project]);
  };

  const addUser = async (id, email) => {
    const emailBod = {
      email: email,
    };

    await api.post(`/projects/${id}`, emailBod);

    update();
  };

  const addTask = async (projectID,title,description,timeEst) => {

    const taskBody = {
      projectID: projectID,
      title: title,
      description: description,
      timeEst: timeEst,
      status: false,
    };
    await api.post(`/tasks`, taskBody);

    update();
  };

  const projectClick = async (project) => {
    if (project) {
      setFocusProject(project);

      const { lead } = await api.get(`/projects/${project.id}/lead`);
      if (lead) {
        setlead(lead);
      }
      const {users} = await api.get(`/projects/${project.id}/default`);
      setUsers(users);

      const {tasks} = await api.get(`/tasks/${project.id}`);
      setTasks(tasks);

      setFocusUser();
    }
  }

  const update = async () => {
    if (focusProject) {
      
      const { lead } = await api.get(`/projects/${focusProject.id}/lead`);
      if (lead) {
        setlead(lead);
      }

      const {users} = await api.get(`/projects/${focusProject.id}/default`);
      setUsers(users);

      const {tasks} = await api.get(`/tasks/${focusProject.id}`);
      setTasks(tasks);
    }
  }

  

  //These functions need to use the task controller
  const assignUser = async (task)=> {
    //This will add the current focused user to the task, but only if they are the project lead other wise it will only add themselves
    console.log(task.id + " " + focusUser.id)
  }

  const completeTask = async (task) => {
    //This will complete a task
    console.log(task.id);
  }

  //put in way to put in new project name
  return (
    <div className="bg-blue-200">
      <div className="bg-blue-900/90">        
      </div>
      <div className="flex flex-row h-full">
        <div className="bg-blue-500/75 m-5 rounded flex-1 shadow-md max-h-screen overflow-y-auto">
        <Button 
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            createProject(projectName);
          }}
        >
          Create New Project
        </Button>
        <input
          className="border-2"
          id="projectNameEnter"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          type="text"
        />
        {' '}
            {projects.map((project) => {

              const isSelected = focusProject && project.id === focusProject.id;

              return (
                <div key={project.id}>
                  <Project project={project} myOnClick={projectClick} isSelected={isSelected}/>
                </div>
              );
            })}
        </div>
                  {/* TODO: clean these up into some component? */}
        <div className="bg-blue-600/75 m-5 rounded flex-1 shadow-md max-h-screen overflow-y-auto"> 
        <div> <Button onClick={() => addUser(focusProject.id, email)}>Add User</Button> <label htmlFor="emailEnter">User Email:</label>
        <input
          className="border-2"
          id="emailEnter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        /></div>
        {users.map((user) => {

              const isSelected = focusUser && user.id === focusUser.id;

              return (
                <div key={user.id}>
                  <User user={user} lead={lead} setFocus={setFocusUser} isSelected={isSelected}/>
                </div>
              );
            })} </div>
        <div className="bg-blue-700/75 m-5 rounded flex-1 shadow-md max-h-screen overflow-y-auto"> 
        <div> <Button onClick={() => addTask(focusProject.id,taskTitle,taskDesc,taskTime)}>Add Task</Button> 
        <label htmlFor="taskEnter">Task Title:</label>
        <input
          style={{ width:"140px" }}
          className="border-2"
          id="taskTitleEnter"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          type="text"
        />
        <label htmlFor="taskTime">Time in hours:</label>
        <input
          style={{ width:"140px" }}
          className="border-2"
          id="taskTimeEnter"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          type="text"
        /></div>
        <div>
        <label htmlFor="taskDescEnter">Task Description:</label>
        <input
          style={{ width:"430px" }}
          className="border-2"
          id="taskDescEnter"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          type="text"
        /></div>
        {tasks.map((task) => {
              return (
                <div key={task.id}>
                  <Task task={task} completeTask={completeTask} addUser={assignUser}/>
                </div>
              );
            })} </div>
      </div>
    </div>
  );
};
