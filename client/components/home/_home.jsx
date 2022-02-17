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
        <Button
          onClick={() => {
            createProject();
          }}
        >
          Create New Project
        </Button>{' '}
      </div>
      <div className="flex flex-row h-full">
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
        <div className="bg-blue-500/75 m-5 rounded flex-1"> article2 </div>
        <div className="bg-blue-700/75 m-5 rounded flex-1"> To-Do </div>
        <div className="bg-blue-900/75 m-5 rounded flex-1"> Finished </div>
      </div>
    </div>
  );
};
