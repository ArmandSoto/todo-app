import { useState, useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'


export default function TodoList(){

    const [ tasks, setTasks ] = useState(JSON.parse(localStorage.getItem('items')) || [])
    const [ currentTask, setCurrentTask ] = useState({
        name: "",
        id: "", 
    })
    const [ taskPaneIsActive, setTaskPaneIsActive ] = useState(false)


    const taskComponents = tasks.map((task, index) => {
        return <TaskCard
                key={index}
                name={task.name}
                id={task.id}
                deleteTask={handleDeleteTask}
                editTask={handleEditTask}
            />
            
    })


    useEffect(() => {   
        localStorage.setItem('items', JSON.stringify(tasks))
    }, [tasks])


    function addTask(){ 
        setTasks(
            prevTasks => {
                return [...prevTasks, currentTask]      
            }
        )
    }
    
    function handleSubmit(e){
        e.preventDefault()
       
        if(currentTask.id <= tasks.length){
            setTasks(prev => {
                const taskArray = prev.map((item => 
                    item.id === currentTask.id ? currentTask : item
                ))
                return taskArray
            })
        } else{
            addTask()
        }

        setCurrentTask({
            name: "",
            id: ""
        })   
        setTaskPaneIsActive(prev => !prev)    
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
        console.log(`Task ${taskId} is being edited`)
        
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