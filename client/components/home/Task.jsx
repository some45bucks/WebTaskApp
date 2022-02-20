import { Button } from '../common/button';
export const Task = ({task,completeTask,addUser}) => {

    return(
        <div className="flex-1 border-2 rounded p-2 m-2 bg-blue-500" onClick={()=>completeTask(task)}>
            <div><input
                className="border-2"
                defaultValue={'task number: ' + task.id}
                
                type="text"/>
            <input
                className="border-2"
                defaultValue={task.title}
                
                type="text"/> <Button >Update Task</Button> </div>
            <input
                multiline
                className="border-2"
                defaultValue={'description'}
                
                type="text"/>
            <input
                className="border-2"
                defaultValue={'time estimate: ' + task.timeEst}
                
                type="text"/>
            <div>{task.description}</div>
            <div>
            <input
                className="border-2"
                defaultValue={''}
                
                type="text"/>
            <Button onClick={()=>addUser(task)}>Add User</Button></div>
        </div>
    )
}