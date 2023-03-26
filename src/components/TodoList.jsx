import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { DragDropContext } from 'react-beautiful-dnd'
import { StrictModeDroppable as Droppable} from '../helpers/StrictModeDroppable'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'




export default function TodoList(props){

    const [ tasks, setTasks ] = useState(JSON.parse(localStorage.getItem('items')) || [])
    const [ completedTasks, setCompletedTasks ] = useState(JSON.parse(localStorage.getItem('completed')) || [])
    const [ taskPaneIsActive, setTaskPaneIsActive ] = useState(false)
    const [ currentTask, setCurrentTask ] = useState({
        name: "",
        id: "",
        isComplete: false
    })


    useEffect(() => {
      localStorage.setItem('completed', JSON.stringify(completedTasks))
    }, [completedTasks])
    
    useEffect(() => {   
        localStorage.setItem('items', JSON.stringify(tasks))
    }, [tasks])
    
    const taskComponents = tasks.map((task, index) => {
        return <TaskCard
                key={nanoid()}
                name={task.name}
                id={task.id}
                deleteTask={removeFromTasks}
                editTask={handleEditTask}
                closePane={closePane}
                isComplete={task.isComplete}
                moveToCompleted={moveToCompleted}
                moveToTasks={moveToTasks}
            />
            
    })


    function removeItem(arr, id){
        let taskArray = arr.filter(item => item.id != id)
        let taskArrayMap = taskArray.map((task, index)=>{
            return {
                ...task,
                id: index + 1
            }
        })

        return taskArrayMap
    }

    function removeFromTasks(taskId){             
        setTasks(prevTasks => removeItem(prevTasks, taskId))
    }

    function removeFromCompleted(taskId){
        setCompletedTasks(prevTasks => removeItem(prevTasks, taskId))
    }

    function addToList(arr, itemToAdd){
        let newId = arr.length + 1
        let newList = [...arr, {...itemToAdd, id: newId}]
        return newList 
    }


    function moveToTasks(incompleteTaskId){
        let itemToRestore;

        setCompletedTasks(prevCompleted => prevCompleted.map(item =>{
            if (item.id === incompleteTaskId){
                itemToRestore = {
                    ...item,
                    isComplete: !item.isComplete
                }
                return itemToRestore
            }
            return item
        }))

        setTasks(prevList => addToList(prevList, itemToRestore))

        removeFromCompleted(incompleteTaskId)
    }

    /* these functions can be combined and refactored  */

    function moveToCompleted(completedTaskId){
        
        let completedTask;

        setTasks(prevTasks => prevTasks.map(item => {
            if(item.id === completedTaskId){
                completedTask = {
                    ...item,
                    isComplete: !item.isComplete
                }
                return completedTask
            }
            return item
        }))
        
        
        setCompletedTasks(prevList => addToList(prevList, completedTask))

        removeFromTasks(completedTaskId)       
        
    }



    function closePane(){
        if(taskPaneIsActive){
            setTaskPaneIsActive(prev => !prev)
        }
    }

    //consider calling this createNewTask
    function addTask(){
        if(currentTask.name.trim().length > 0){
            setTasks(
                prevTasks => {
                    return [...prevTasks, currentTask]      
                }
            )
        }     
        setTaskPaneIsActive(prev => !prev)         
    }  
    
    function handleSubmit(e){
        e.preventDefault()
       
        if(currentTask.id <= tasks.length){ //checks to see if we are editing an already existing element
            setTasks(prev => {
                const taskArray = prev.map((item => 
                    item.id === currentTask.id ? currentTask : item
                ))
                return taskArray
            })
            setTaskPaneIsActive(prev => !prev) 
        } else { 
                addTask()        
             
        }

        setCurrentTask({
            name: "",
            id: "",
            isComplete: false
        })   
        
    }



    function handleEditTask(taskId){
       
        setCurrentTask({
            name: tasks[taskId-1].name,
            id: tasks[taskId-1].id,
            isComplete: false
        })
        setTaskPaneIsActive(prev => !prev)

    }

    function handleChange(e){
        setCurrentTask(
            prev => {
                if(currentTask.id <= tasks.length && currentTask.id != ""){ 
                    return {
                        ...prev,
                        name: e.target.value,
                    }
                } 
                return {
                    ...prev,
                    name: e.target.value,
                    id: tasks.length + 1,
                    
                }
            }
        )     
    }

    function handleClick(){
        setTaskPaneIsActive(prev => !prev)
    }


    function drop(result) {      
        if (!result){
            return
        }
        let taskItemsCopy = [...tasks]
        const [reorderedItem] = taskItemsCopy.splice(result.source.index, 1)
        taskItemsCopy.splice(result.destination.index, 0, reorderedItem)
        taskItemsCopy = taskItemsCopy.map((item, index) => {
            return {
                ...item,
                id: index + 1
            }
            
        })
        setTasks(taskItemsCopy)
    }


    

    return (
        <div className={"flex-column w-1/3"}>
            <div className={"flex-column"}>
                <DragDropContext onDragEnd={drop}>
                    <Droppable droppableId="todos">
                        {(provided)=>(
                        <ul className="flex-column space-between"
                            {...provided.droppableProps} ref={provided.innerRef}
                        >
                                {taskComponents}
                                {provided.placeholder}
                        </ul>
                    )}
                    </Droppable>
                </DragDropContext>
            </div>

            
            <div className="flex">

                {
                    !taskPaneIsActive ? 
                        <>
                            <PlusCircleIcon onClick={handleClick} className="h-10 w-10 text-emerald-400" />
                            <p className={tasks.length > 0 ? "hidden" : "leading-10 ml-5"}>You have no tasks currently</p>
                        </>
                    :
                        <>
                            <TaskForm handleSubmit={handleSubmit} handleChange={handleChange} currentTask={currentTask} />
                        </>
                }
                
            </div>
                          
        </div>
    )
}