import { Button } from '../common/button';
export const Task = ({task,completeTask,addUser}) => {

    return(
        <div className={`flex-1 border-2 rounded p-2 m-2 bg-${(task.status) ? 'green':'red'}-500`}>
            {task.id}- 
            {task.title}-
            {task.description}- 
            {task.timeEst}-           
            <Button onClick={()=>addUser(task)}>Add User</Button> 
            <Button onClick={()=>completeTask(task)}>Complete Task</Button>
        </div>
    )
}