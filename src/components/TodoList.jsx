import { useState, useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import TaskCard from './TaskCard'
import NewTaskForm from './NewTaskForm'


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
            />
            
    })


    useEffect(() => {   
        localStorage.setItem('items', JSON.stringify(tasks))
    }, [tasks])

    
    function handleSubmit(e){
        e.preventDefault()
        addTask()
        setCurrentTask({
            name: "",
            id: "",
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

    function handleChange(e){
        setCurrentTask(
            prev => {
                return {
                    ...prev,
                    name: e.target.value,
                    id: tasks.length + 1,
                    
                }
            }
        )     
    }

    function addTask(){ 
        setTasks(
            prevTasks => {
                return [...prevTasks, currentTask]      
            }
        )
    }


    function handleClick(){
        setTaskPaneIsActive(prev => !prev)
    }
    

    return (
        <div className={"flex-column border-2 w-2/3"}>
            <div className={"flex border-2"}>
                
                <PlusCircleIcon onClick={handleClick} className="h-8 w-8 text-emerald-400" />
                <p className={tasks.length > 0 ? "hidden" : "ml-5"}>You have no tasks currently</p>
            </div>

            

            {
                taskPaneIsActive &&
                <NewTaskForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    currentTask={currentTask}
                    
                />
            }                 
            
                <div className={"flex-column"}>
                    <ul className="flex-column space-between">
                            {taskComponents}
                    </ul>
                </div>
        </div>
    )
}