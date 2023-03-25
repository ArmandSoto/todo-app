
export default function Sidebar(props){
    return (
        <nav className="h-screen px-8">
            <ul>
                <li className="cursor-pointer p-2" onClick={(event) => { props.handleToggleTodoList(event) }}>Inbox</li>
                <li className="cursor-pointer p-2" onClick={(event) => { props.handleToggleTodoList(event) }}>Completed</li>
            </ul>
        </nav>
    )
}