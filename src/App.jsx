import { useState, useEffect, useReducer } from "react";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ImportantTasks from "./components/ImportantTasks";
import "./App.css";

function App() {


  
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showTodoList, setShowTodoList] = useState(true);
  const [page, setPage] = useState("Inbox")


  function toggleSidebar() {
    setSidebarIsOpen((prevState) => !prevState);
  }


  function handlePageChange(page){
    setPage(page)
  }



  return (
    <main className="text-base font-extralight tracking-wide overflow-hidden h-screen">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex h-full">
        {sidebarIsOpen && (
            <Sidebar changePage={handlePageChange} />
          
        )}
        <section className="flex flex-grow justify-center p-8 border-2">
          {/* {showTodoList ? <TodoList /> : <ImportantTasks />} */}
          {
            page==='Inbox' && <TodoList page={page}/>
          }
          {
            page==='Important' && <ImportantTasks page={page} />
          }
        </section>
      </div>
    </main>
  );
}

export default App;
