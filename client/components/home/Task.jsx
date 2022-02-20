import { Button } from '../common/button';
export const Task = ({task,completeTask,addUser}) => {

    return(
        <div className="flex-1 border-2 rounded p-2 m-2 bg-blue-500">
            <div><input
                className="border-2"
                id="idEnter"
                defaultValue={'task number: ' + task.id}
                // value = {id}
                // onChange={(e) => setId(e.target.value)} 
                type="text"/>
            <input
                className="border-2"
                id="titleEnter"
                defaultValue={task.title}
                // value = {title}
                // onChange={(e) => setTitle(e.target.value)} 
                type="text"/> <Button onClick={()=>addTask(id, )}>Update Task</Button> </div>
            <input
                className="border-2"
                id="descriptionEnter"
                defaultValue={'description'}
                // value = {description}
                // onChange={(e) => setDescription(e.target.value)} 
                type="text"/>
            <input
                className="border-2"
                id="timeEstEnter"
                defaultValue={'time estimate: ' + task.timeEst}
                // value = {timeEst}
                // onChange={(e) => setTimeEst(e.target.value)} 
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