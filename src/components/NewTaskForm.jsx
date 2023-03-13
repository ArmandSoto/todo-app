

export default function NewTaskForm(props){
    return (
        <form onSubmit={props.handleSubmit} className="flex">
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
        </form>

    )
}

