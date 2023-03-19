

export default function TaskForm(props){
    
    return (
        <form onSubmit={props.handleSubmit} className="flex-col w-full border-2 rounded-md p-2 justify-around">
                <div>
                        <input className="border-none" 
                            type="text"
                            name="task-name" 
                            onChange={props.handleChange}
                            value={props.currentTask.name}
                            placeholder="Enter a Task..."  
                        />
                </div>
                <div className="flex justify-end">
                    <button className=" border-2 rounded-lg p-2 text-white bg-purple-400" >Cancel</button>
                    <button className="border-2 rounded-lg p-2 text-white bg-red-500" type="submit" >Add Task </button>
                </div>
        </form>

    )
}

