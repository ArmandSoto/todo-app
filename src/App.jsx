import { useState } from "react";
import { nanoid } from "nanoid";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ImportantTasks from "./components/ImportantTasks";
import "./App.css";

function App() {
  const themeColors = [
    { key: nanoid(), color: "bg-blue-600" },
    { key: nanoid(), color: "bg-red-600" },
    { key: nanoid(), color: "bg-green-600" },
    { key: nanoid(), color: "bg-yellow-600" },
    { key: nanoid(), color: "bg-pink-600" },
  ];
  const [currentTheme, setCurrentTheme] = useState(themeColors[0]);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [page, setPage] = useState("Inbox");

  function toggleSidebar() {
    setSidebarIsOpen((prevState) => !prevState);
  }

  function handlePageChange(page) {
    setPage(page);
  }

  function changeTheme(colorIndex){
    setCurrentTheme(themeColors[colorIndex].color)
  }

  return (
    <main className="text-base font-extralight tracking-wide overflow-hidden h-screen">
      <Header currentTheme={currentTheme} toggleSidebar={toggleSidebar} />

      <div className="flex h-full">
        <Sidebar isOpen={sidebarIsOpen} changePage={handlePageChange} themeColors={themeColors} changeTheme={changeTheme} />

        <section className="flex flex-grow justify-center p-8 border-2">
          {page === "Inbox" && <TodoList page={page} />}
          {page === "Important" && <ImportantTasks page={page} />}
        </section>
      </div>
    </main>
  );
}

export default App;
