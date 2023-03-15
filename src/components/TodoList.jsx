import { useState, useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'


export default function TodoList(){

    const [ tasks, setTasks ] = useState(JSON.parse(localStorage.getItem('items')) || [])
    const [ taskPaneIsActive, setTaskPaneIsActive ] = useState(false)
    const [ tasksCompleted, setTaskCompleted ] = useState(0)
    const [ currentTask, setCurrentTask ] = useState({
        name: "",
        id: "",
        completed: false 
    })


    const taskComponents = tasks.map((task, index) => {
        return <TaskCard
                key={index}
                name={task.name}
                id={task.id}
                deleteTask={handleDeleteTask}
                editTask={handleEditTask}
                closePane={closePane}
                isCompleted={task.isCompleted}
            />
            
    })


    useEffect(() => {   
        localStorage.setItem('items', JSON.stringify(tasks))
    }, [tasks])


    function closePane(){
        if(taskPaneIsActive){
            setTaskPaneIsActive(prev => !prev)
        }
    }

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
            id: ""
        })   
        
    }

    function handleDeleteTask(taskID){        
        setTasks(prevTasks => {
            let taskArray = prevTasks.filter(item => item.id != taskID)
            let taskArrayMap = taskArray.map((task, index) =>{
                return {
                    ...task,
                    id: index + 1,
                }
            })
                  
            return taskArrayMap
        })          
    }

    function handleEditTask(taskId){
       
        setCurrentTask({
            name: tasks[taskId-1].name,
            id: tasks[taskId-1].id
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
    

    return (
        <div className={"flex-column border-2 w-1/3"}>
     
            <div className={"flex-column"}>
                <ul className="flex-column space-between">
                        {taskComponents}
                </ul>
            </div>
            <div className={"flex border-2"}>

                {
                    !taskPaneIsActive ? 
                        <><PlusCircleIcon onClick={handleClick} className="h-8 w-8 text-emerald-400" />
                        <p className={tasks.length > 0 ? "hidden" : "ml-5"}>You have no tasks currently</p></>
                    :
                    <>
                        <TaskForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            currentTask={currentTask}   
                        />
                    </>
                }
                
            </div>
                          
        </div>
    )
}