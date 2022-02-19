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
  }

  const createProject = async () => {
    const projectNameBody = {
      name: 'Give Me a Name'
    };
    const { project } = await api.post('/projects', projectNameBody);
    setProjects([...projects, project]);
  }

  const addUser = async (id, email, update) => {
    const emailBod = {
      email: email
    };
    await api.post(`/projects/${id}`, emailBod)
    update();
  }

  return (
    <div className="p-4">
      <Button onClick={() => { createProject() }}>Create New Project</Button>
      {projects.map((project) => {
        return (
          <div key={project.id}>
            <Project project={project} addUser={addUser} />
          </div>
        )
      })}
    </div>
  );
};
