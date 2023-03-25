
import { Bars3Icon } from "@heroicons/react/24/outline"

export default function Header(props){
    return (
        <div className="flex w-full p-4 items-center bg-blue-600">
            <Bars3Icon className="h-6 w-6 mr-4 text-white" onClick={props.toggleSidebar}/>
            <h2 className=" text-5xl font-extrabold text-white font-lobster">Fast Task</h2>
        </div>
    )
}