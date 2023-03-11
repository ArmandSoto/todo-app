import { useState, useEffect } from 'react'
import Task from './Task'

export default function TodoList(){

    const [ tasks, setTasks ] = useState(JSON.parse(localStorage.getItem('items'))|| [])
    const [ currentTask, setCurrentTask ] = useState({
        name: "",
        id: "", 
    })


    const taskComponents = tasks.map((task, index) => {
        return <Task 
                key={index}
                name={task.name}
                id={index + 1}
                deleteTask={handleDeleteTask}
            />
            
    })


useEffect(() => {   
    localStorage.setItem('items', JSON.stringify(tasks))
}, [tasks])


    function handleSubmit(e){
        e.preventDefault()
        addTask()       
    }

    function handleDeleteTask(task){       
        setTasks(prevTasks => {
            return prevTasks.splice(task.id - 1, 1)
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
    

    return (
        <div className="flex-column justify-center border-2 w-96">
            <form onSubmit={handleSubmit} className="flex space-x-4 items-center">
                <label htmlFor="task-name">Task:</label>
                <input className="border-2" 
                       type="text"
                       name="task-name" 
                       onChange={handleChange}
                       value={currentTask.name}
                        
                />
                <button className="rounded-full h-12 w-12 bg-green-500 text-white text text-xl" > + </button>    
            </form>
                <ul className="flex-column space-between">
                    {taskComponents}
                </ul>
        </div>
    )
}