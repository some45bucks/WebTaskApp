import { Button } from '../common/button';
export const Task = ({task,completeTask,addUser}) => {

    return(
        <div className={`flex-1 text-left border-2 rounded p-2 m-2 shadow-md bg-blue-200`}>
            <div> Task ID: {task.id}</div>
            <div> Task Title: {task.title}</div>
            <div> Description: {task.description}</div>
            <div> Time Estimate: {task.timeEst}</div>
            <div> Task Status:
            {(task.status) ? <div className="bg-green-500 w-1/6"> Complete! </div> : <div className='bg-red-500  w-1/4'> Not Complete! </div>} </div>
            <div> Assigned: {task.userId}</div>
        
            <Button onClick={()=>addUser(task)}>Add User</Button> 
            <Button onClick={()=>completeTask(task)}>Complete Task</Button>
        </div>
    )
}