
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function TaskCard(props){

    const [ showEllipsis, setShowEllipsis ] = useState(false)
    const [ isCompleted, setIsCompleted ] = useState(false)

    function handleShowEllipsis(){
        setShowEllipsis(prevState => !prevState)
    }

    function checkboxChangeHandler(){
        setIsCompleted(prevCompletedState => !prevCompletedState)
        props.completeTask(props.id)

    }
    
    
    return (
        <div className="border-2 shadow-lg rounded-lg my-2 p-4 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"  >
            <li className= "flex" onMouseEnter={handleShowEllipsis} onMouseLeave={handleShowEllipsis}>

                <input type="checkbox" 
                       className="mr-3"
                       checked={isCompleted}
                       onChange={checkboxChangeHandler}  />
                <p className={isCompleted ? "line-through" : ""}>{ props.id + ". " + props.name } </p>
   
                {
                    showEllipsis && 
                    <div className="flex ml-auto">
                        <PencilSquareIcon className="h-6 w-6" onClick={() => { props.editTask(props.id) }}/>
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                        <TrashIcon  className="h-6 w-6 inline-block ml-3 text-red-600" onClick={(e) => { props.deleteTask(props.id) } }/>
                    </div>
                }
            </li>
            
        </div>
    )
}