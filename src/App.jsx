import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CompletedTasks from './components/CompletedTasks'
import './App.css'




function App() {
  
  const [ sidebarIsOpen, setSidebarIsOpen ] = useState(false)
  const [ showTodoList, setShowTodoList ] = useState(true)
  const [ completedTasks, setCompletedTasks ] = useState(JSON.parse(localStorage.getItem('completed')) || [])

  useEffect(() => {
    localStorage.setItem('completed', JSON.stringify(completedTasks))
  }, [completedTasks])
  
  function toggleSidebar(){
    setSidebarIsOpen(prevState => !prevState)
  }

  function toggleTodoList(event){
    if(event.target.innerHTML === "Inbox" && !showTodoList || event.target.innerHTML === "Completed" && showTodoList){
      setShowTodoList(isShown => !isShown)  
    }
  }

  function handleAddToCompleted(task){
    setCompletedTasks(prevList => [...prevList, task])
    console.log(completedTasks)
  }

  

  return (
    
    <main className="text-base font-extralight tracking-wide h-screen ">
      <Header toggleSidebar={toggleSidebar}/>

    <div className="flex">
      {
        sidebarIsOpen && <nav className="border-2 w-auto"> <Sidebar handleToggleTodoList={toggleTodoList}/> </nav>
      }
      <section className="flex flex-grow justify-center mt-4">
        {
          showTodoList ? <TodoList addToCompleted={handleAddToCompleted} /> : <CompletedTasks />
          
        }
      </section>
    </div>  
        
    </main>


  )
}

export default App
