
import { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { EllipsisHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function TaskCard(props){

    const [showEllipsis, setShowEllipsis] = useState(false)


    function handleOnMouseEnter(){
        setShowEllipsis(prevState => !prevState)
    }

    function handleOnMouseLeave(){
        setShowEllipsis(prevState => !prevState)
    }

    
    
    return (
        <div className="border-2 shadow-lg rounded-lg my-2 p-4"  >
            <li className= "flex" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>

                <input type="checkbox" className="mr-3" />
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