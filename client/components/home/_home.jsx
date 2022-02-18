import { debug } from 'console';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Project } from './Project';
import { User } from './User';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [focusProject, setFocusProject] = useState();
  const [lead, setlead] = useState({ firstName: 'Loading...' });

  useEffect(async () => {
    const { projects } = await api.get('/projects');
    setProjects(projects);
  }, []);

  const createProject = async ()=>{
    const projectNameBody = {
      name: 'Give Me a Name'
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

  const projectClick = async (project) => {
    if (project) {
      
      console.log(project.id);

      setFocusProject(project);

      const { lead } = await api.get(`/projects/${project.id}/lead`);
      if (lead) {
        setlead(lead);
      }

      const {users} = await api.get(`/projects/${project.id}/default`);
      setUsers(users);
    }
  }

  const update = async () => {
    if (focusProject) {
      console.log(focusProject.id);

      const { lead } = await api.get(`/projects/${focusProject.id}/lead`);
      if (lead) {
        setlead(lead);
      }

      const {users} = await api.get(`/projects/${focusProject.id}/default`);
      setUsers(users);
    }
  }

  //put in way to put in new project name
  return (
    <div className="bg-blue-200">
      <div className="bg-blue-900/90">
                          {/* TODO: make this button look nicer */}
        <Button
          onClick={() => {
            createProject();
          }}
        >
          Create New Project
        </Button>{' '}
      </div>
      <div className="flex flex-row h-full">
{/* TODO: the whole page is too big (so it scrolls), can't figure it out, height of this div seems to be the problem*/}
        <div className="bg-blue-900/90 flex-none w-1/6 mr-1 max-h-screen overflow-y-auto">
          <div className="bg-blue-200">
            {projects.map((project) => {
              return (
                <div key={project.id}>
                  <Project project={project} addUser={addUser} myOnClick={projectClick}/>
                </div>
              );
            })}
          </div>
        </div>
                  {/* TODO: clean these up into some component? */}
        <div className="bg-blue-500/75 m-5 rounded flex-1 shadow-md"> 
        {users.map((user) => {
              return (
                <div key={user.id}>
                  <User user={user} lead={lead}/>
                </div>
              );
            })} </div>
        <div className="bg-blue-700/75 m-5 rounded flex-1 shadow-md"> To-Do </div>
        <div className="bg-blue-900/75 m-5 rounded flex-1 shadow-md"> Finished </div>
      </div>
    </div>
  );
};
