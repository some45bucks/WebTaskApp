import { useContext, useEffect, useState } from 'react';
import { async } from 'rxjs';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';
import { addProjectName } from './_home';


export const Project = ({ project, myOnClick, isSelected}) => {
  const api = useContext(ApiContext);
  const [projectName, setProjectName] = useState(project.name)  

  return (
    <div className={`flex-1 border-2 rounded p-2 m-2 bg-${(isSelected) ? 'red':'blue'}-500`} onClick={()=> myOnClick(project)}>
      <Button onClick={() => addProjectName(project.id, email)}>Change Name</Button>
      <label>Project Name:
        <input
          defaultValue={projectName}
          onChangeText={(e) => setProjectName(e.target.value)}
          type="text"/>
      <div>Project id: {project.id}</div>
      </label>
    </div>
  );
};
