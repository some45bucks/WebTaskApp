import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';

export const Project = ({project,addUser}) => {
    const api = useContext(ApiContext);
    const [email, setEmail] = useState('');
    const [lead, setlead] = useState({firstName: "Loading..."});
    const [users, setUsers] = useState([]);

    useEffect(async () => {
      const {lead} = await api.get(`/projects/${project.id}/lead`);
      if(lead)
      {
        setlead(lead);
      }
      

      const {users} = await api.get(`/projects/${project.id}/default`)
      setUsers(users);
      if(users)
      {
        setUsers(users)
      }
    }, []);
    
console.log(users);

    return (
      <div className="border-2 rounded p-4">
        Project {project.id} {lead.firstName}
        
        {users.map((user) => {
          if(user.id !== lead.id)
          {
              console.log("TODO");
          }

          return (
          <div key={user.id}> 
          
          </div>
        )})}
        <div>
          <Button onClick={() => console.log(project.id)}>Add Task</Button>
          <label htmlFor="emailEnter" >User Email:</label>
          <input id="emailEnter" value={email} onChange={(e)=> setEmail(e.target.value)} type="text"/>
          <Button onClick={() => addUser(project.id,email)}>Add User</Button>
        </div>
      </div>
    );
  };