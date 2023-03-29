
export default function Sidebar(props){
    return (
        <nav className=" w-1/6 border-2 px-8">
            <ul>
                <li className="cursor-pointer p-2" onClick={(event) => { props.changePage(event.target.innerHTML) }}>Inbox</li>
                <li className="cursor-pointer p-2" onClick={(event) => { props.changePage(event.target.innerHTML) }}>Important</li>
            </ul>
        </nav>
    )
}