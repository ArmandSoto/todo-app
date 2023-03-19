
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function TaskCard(props){

    const [ showEllipsis, setShowEllipsis ] = useState(false)
    const [ isComplete, setIsComplete ] = useState(props.isComplete || false)

    function handleShowEllipsis(){
        setShowEllipsis(prevState => !prevState)
    }

    function checkboxChangeHandler(){
        setIsComplete(prevCompleteState => !prevCompleteState)
        props.completeTask(props.id)

    }
    
    
    return (
        <div className="border-2 shadow-lg rounded-lg my-2 p-4 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"  >
            <li className= "flex" onMouseEnter={handleShowEllipsis} onMouseLeave={handleShowEllipsis}>

                <input type="checkbox" 
                       className="mr-3"
                       checked={isComplete}
                       onChange={checkboxChangeHandler}  />
                <p className={isComplete ? "line-through" : ""}>{ props.id + ". " + props.name } </p>
   
                {
                    showEllipsis && 
                    <div className="flex ml-auto">
                        <PencilSquareIcon className="h-6 w-6" onClick={() => { props.editTask(props.id) }}/>
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                        <TrashIcon  className="h-6 w-6 inline-block ml-3 text-red-600" onClick={(e) => { 
                            if (isComplete){
                                setIsComplete(prev => !prev)
                            }
                            props.deleteTask(props.id) } }/>
                    </div>
                }
            </li>
            
        </div>
    )
}