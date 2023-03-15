
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function TaskCard(props){

    const [showEllipsis, setShowEllipsis] = useState(false)
    const [ isCompleted, setIsCompleted ] = useState(false)

    function handleShowEllipsis(){
        setShowEllipsis(prevState => !prevState)
    }

    function checkHandler(){

        if(isCompleted){
            console.log("This task has been completed")
        }
        else{
            console.log("This task has not been completed")
        }
        setIsCompleted(prevCompletedState => !prevCompletedState)
    }
    
    
    return (
        <div className="border-2 shadow-lg rounded-lg my-2 p-4"  >
            <li className= "flex" onMouseEnter={handleShowEllipsis} onMouseLeave={handleShowEllipsis}>

                <input type="checkbox" 
                       className="mr-3"
                       checked={isCompleted}
                       onChange={checkHandler}  />
                <p className="">{ props.id + ". " + props.name } </p>
   
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