import { Button } from '../common/button';
export const Task = ({task,completeTask,addUser}) => {

    return(
        <div className="flex-1 border-2 rounded p-2 m-2 bg-blue-500">
            <div>{task.title}</div>
            <div>{task.timeEst}</div>
            <div>{task.description}</div>
            <Button onClick={()=>addUser(task)}>Add User</Button> 
            <Button onClick={()=>completeTask(task)}>Complete Task</Button>
        </div>
    )
}