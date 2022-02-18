import { debug } from 'console';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Project } from './Project';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);

  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    resetProjects();
  }, []);

  const resetProjects = async () => {
    const { projects } = await api.get('/projects');
    setProjects(projects);
  };

  const createProject = async () => {
    const { project } = await api.post('/projects');
    setProjects([...projects, project]);
  };

  const addUser = async (id, email, update) => {
    const emailBod = {
      email: email,
    };
    await api.post(`/projects/${id}`, emailBod);
    update();
  };


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
                  <Project project={project} addUser={addUser} />
                </div>
              );
            })}
          </div>
        </div>
                  {/* TODO: clean these up into some component? */}
        <div className="bg-blue-500/75 m-5 rounded flex-1 shadow-md"> Other Users </div>
        <div className="bg-blue-700/75 m-5 rounded flex-1 shadow-md"> To-Do </div>
        <div className="bg-blue-900/75 m-5 rounded flex-1 shadow-md"> Finished </div>
      </div>
    </div>
  );
};
