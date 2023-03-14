

export default function TaskForm(props){
    return (
        <form onSubmit={props.handleSubmit} className="flex-col w-full justify-around">
                <div>
                    <label htmlFor="task-name">Task:</label>
                        <input className="border-2" 
                            type="text"
                            name="task-name" 
                            onChange={props.handleChange}
                            value={props.currentTask.name}
                            placeholder="Enter a Task..."    
                        />
                </div>
                <div className="flex justify-end">
                    <button className=" border-2 rounded-lg p-2 text-white bg-purple-400">Cancel</button>
                </div>
        </form>

    )
}

