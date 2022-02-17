import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';

export const Project = ({ project, addUser }) => {
  const api = useContext(ApiContext);
  const [email, setEmail] = useState('');
  const [lead, setlead] = useState({ firstName: 'Loading...' });
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    update();
  }, []);

  const update = async () => {
    if (project) {
      const { lead } = await api.get(`/projects/${project.id}/lead`);

      if (lead) {
        setlead(lead);
      }

      const { users } = await api.get(`/projects/${project.id}/default`);
      setUsers(users);
    }
  };
  

  return (
    <div className="flex-1 border-2 rounded p-2 m-2 bg-blue-500" onClick={() => console.log('yeet')}>
      <div>Project name: {project.name}</div>
      <div>Project id: {project.id}</div>
      <div>Lead: {lead.firstName}</div>

      <div>
        Other Users:
        {users.map((user) => {
          if (user.id !== lead.id) {
            return <div key={user.id}>{user.firstName}</div>;
          }
        })}
      </div>
      <div>
          {/* This is where the task button is */}
          <div> <Button onClick={() => console.log(project.id)}>Add Task</Button> </div>

          <div> <Button onClick={() => addUser(project.id, email, update)}>Add User</Button> </div>
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
