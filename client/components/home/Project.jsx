import { useContext, useEffect, useState } from 'react';
import { async } from 'rxjs';
import { ApiContext } from '../../utils/api_context';
import { Button } from '../common/button';

export const Project = ({ project, addUser }) => {
  const api = useContext(ApiContext);
  const [email, setEmail] = useState('');
  const [lead, setlead] = useState({ firstName: 'Loading...' });
  const [taskTitle, setTaskTitle] = useState('')
  //If we do the four column page then this will probaly need to go on the home page since
  //the users will be displayed seprate from the projects
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

  const saveTask = async (user, project, title) => {
    const taskBody = {
      userID: user.id,
      projectID: project.id,
      title: taskTitle,
      description: 'This is content',
      timeEst: 20,
      status: false,
    }
    const { task } = await api.post('/tasks', taskBody);
    update();
  }

  return (
    <div className="border-2 rounded p-4">
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
        <div>Title:</div>
        <textarea value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} cols="30" rows="1" className="border-2"> test</textarea>
        <br />
        {/* This is where the task button is */}
        <Button onClick={() => saveTask(lead, project, taskTitle)}>Add Task</Button>
        <br />
        <label htmlFor="emailEnter">User Email:</label>
        <input
          className="border-2"
          id="emailEnter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <Button onClick={() => addUser(project.id, email, update)}>Add User</Button>
      </div>
    </div>
  );
};
