
export default function TaskCard(props){

    //onClick used to be (e => {props.deleteTask(e.target)})
    
    return (
        <div className="border-2 shadow-lg rounded-lg my-2 p-4">
            <li>
                {props.id + ". " + props.name}
                <button className=" border-2 ml-3" onClick={(e) => { props.deleteTask(props.id) } }> Delete </button>
            </li>
        </div>
    )
}