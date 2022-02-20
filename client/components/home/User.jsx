import { useContext} from 'react';
import { ApiContext } from '../../utils/api_context';


export const User = ({user,lead,setFocus,isSelected})=>{
    const api = useContext(ApiContext);
    return (
        <div className={`flex-1 border-2 rounded p-2 m-2 bg-${(isSelected) ? 'blue-200':'blue-500'}`} onClick={()=>setFocus(user)}>
           {(user.id == lead.id) ? 'Lead': 'User'} {user.firstName}
        </div>
    )
}