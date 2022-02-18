import { useContext} from 'react';
import { ApiContext } from '../../utils/api_context';


export const User = ({user,lead})=>{
    const api = useContext(ApiContext);

    if(user.id == lead.id)
    {
        return (
            <div class="border-2">
                LEAD {user.firstName}
            </div>
        )
    }

    return (
        <div>
           User {user.firstName}
        </div>
    )
}