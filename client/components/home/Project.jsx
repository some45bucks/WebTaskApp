import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';

export const Project = ({ project, addUser, myOnClick}) => {
  const api = useContext(ApiContext);
  const [email, setEmail] = useState('');  

  /* Holds all project information (to be spliced up into their appropriate columns) */
  return (
    <div className="flex-1 border-2 rounded p-2 m-2 bg-blue-500" onClick={() => console.log('2')} onClick={()=> myOnClick(project)}>
      <div>Project name: {project.name}</div>
      <div>Project id: {project.id}</div>

      <div>
          {/* This is where the task button is */}
          <div> <Button onClick={() => console.log(project.id)}>Add Task</Button> </div>

          <div> <Button onClick={() => addUser(project.id, email)}>Add User</Button> </div>
          <div>
        <label htmlFor="emailEnter">User Email:</label>
        <input
          className="border-2"
          id="emailEnter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        </div>
      </div>
    </div>
  );
};
