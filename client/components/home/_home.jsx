import { debug } from 'console';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);

  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    //const { projects } = await api.get('/projects');
    //setProjects(projects);
  }, []);

  const createProject = async ()=>{
    const { project } = await api.post('/projects');

    setProjects([...projects, project]);
  }

  return (
    <div className="p-4">
      <Button onClick={()=>{createProject()}}>Create New Project</Button>
        {/* {projects.map((project) => (
          <div key={project.id}> 
          Project Name: {project.id}
            <div>
            </div>
          </div>
        ))} */}
    </div>
  );
};
