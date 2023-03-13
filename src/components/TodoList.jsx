import { useState, useEffect } from 'react'
import Task from './Task'

export default function TodoList(){

    const [ tasks, setTasks ] = useState(JSON.parse(localStorage.getItem('items')) || [])
    const [ currentTask, setCurrentTask ] = useState({
        name: "",
        id: "", 
    })
    const [ taskPaneIsActive, setTaskPaneIsActive ] = useState(false)


    const taskComponents = tasks.map((task, index) => {
        return <Task 
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
    
    function handleKeyPress(event){
        if(event.key === 'Enter'){
            setTaskPaneIsActive(prev => !prev)
            
        }
    }

    return (
        <div className={"flex-column justify-center border-2 w-96"}>
            <form onSubmit={handleSubmit} className="flex space-x-4 items-center">
                <div className={taskPaneIsActive ? "" : "hidden"}>
                    <label htmlFor="task-name">Task:</label>
                        <input className="border-2" 
                            type="text"
                            name="task-name" 
                            onChange={handleChange}
                            value={currentTask.name}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter a Task..."    
                        />
                </div>
            </form>
            
            <div className={""}> {/* handles the background blur */}
                <div className={"flex-column text-center"}>
                    <div className={"flex border-2 justify-around"}>
                        <p className={tasks.length > 0 ? "hidden" : "leading-10"}>You have no tasks currently</p>
                        <button className="rounded-full h-12 w-12 bg-green-500 text-white text text-xl"
                                onClick={handleClick} > + </button>    
                    </div>
                    <ul className="flex-column space-between">
                            {taskComponents}
                    </ul>
                </div>
            </div>
        </div>
    )
}