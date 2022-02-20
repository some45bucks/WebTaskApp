import { Button } from '../common/button';
import { Task } from '../common/task';
export const Task = ({task,completeTask,addUser}) => {

    return(

        <div className={`flex-1 text-left border-2 rounded p-2 m-2 bg-${(task.status) ? 'green':'red'}-500`}>
            <div>{task.title}</div>
            <div>{task.timeEst}</div>
            <div>{task.description}</div>
            <Button onClick={()=>addUser(task)}>Add User</Button> 
            <Button onClick={()=>completeTask(task)}>Complete Task</Button>
        </div>
    )
}
