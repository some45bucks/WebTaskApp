import { notStrictEqual } from 'assert';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    const { tasks } = await api.get('/tasks/me')
    setTasks(tasks);
    setLoading(false);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const saveTask = async () => {
    const taskBody = {
      contents,
    }
    const { note } = await api.post('/tasks', taskBody)
    setTasks([...tasks, task]);
  }

  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
      {roles.includes('admin') && (
        <Button type="button" onClick={() => navigate('/admin')}>
          Admin
        </Button>
      )}
    </div>
  );
};

