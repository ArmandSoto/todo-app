
import { TrashIcon } from '@heroicons/react/24/solid'

export default function TaskCard(props){

    //onClick used to be (e => {props.deleteTask(e.target)})
    
    return (
        <div className="border-2 shadow-lg rounded-lg my-2 p-4">
            <li>
                {props.id + ". " + props.name}
                
                <TrashIcon  className="h-6 w-6 inline-block ml-3 text-red-600" onClick={(e) => { props.deleteTask(props.id) } }/>
            </li>
        </div>
    )
}