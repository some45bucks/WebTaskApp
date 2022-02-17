import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';

export const Project = ({project,addUser}) => {
    const api = useContext(ApiContext);
    const [email, setEmail] = useState('');
    const [lead, setlead] = useState({firstName: "Loading..."});
    //If we do the four column page then this will probaly need to go on the home page since 
    //the users will be displayed seprate from the projects
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        update()
      
    }, []);

    const update = async ()=> 
    {
      if(project)
        {
          const {lead} = await api.get(`/projects/${project.id}/lead`);

          if(lead)
          {
            setlead(lead);
          }
          

          const {users} = await api.get(`/projects/${project.id}/default`)
          setUsers(users);
        }
    }

    return (
      <div className="border-2 rounded p-4">
        <div>Project name: {project.name}</div>
        <div>Project id: {project.id}</div>
        <div>Lead: {lead.firstName}</div>
        
        <div>
        Other Users:
        {users.map((user) => {
          
          if(user.id !== lead.id)
          {
            return (
              <div key={user.id}> 
                {user.firstName}
              </div>)
          }
          
        })}
        </div>
        <div>
          {/* This is where the task button is */}
          <Button onClick={() => console.log(project.id)}>Add Task</Button>

          <label htmlFor="emailEnter" >User Email:</label>
          <input className="border-2" id="emailEnter" value={email} onChange={(e)=> setEmail(e.target.value)} type="text"/>
          <Button onClick={() => addUser(project.id,email,update)}>Add User</Button>
        </div>
      </div>
    );
  };