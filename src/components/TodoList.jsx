import { useState } from 'react'
import Task from './Task'

export default function TodoList(){

    const [ tasks, setTasks ] = useState([])
    const [ currentTask, setCurrentTask ] = useState({
        name: "",
        id: "", 
    })


    const taskComponents = tasks.map((task, index) => {
        return <Task 
                key={index}
                name={task.name}
                id={index + 1}
            />
            
    })

    function handleSubmit(e){
        e.preventDefault()
        addTask()
        
    }

    //issues with the numbering

    function handleChange(e){
        setCurrentTask(
            prev => {
                return {
                    ...prev,
                    name: e.target.value,
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
                <button className="rounded-full h-12 w-12 bg-green-500 text-white text text-xl" >+</button>
                
            </form>
                <ul className="flex-column space-between">
                    {taskComponents}
                </ul>
        </div>
    )
}