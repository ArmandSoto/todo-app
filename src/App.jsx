import { useState, useEffect } from "react";
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

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("Inbox")) || []
  );
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem(`Inbox Completed`)) || []
  );

  const [importantTasks, setImportantTasks] = useState(
    JSON.parse(localStorage.getItem("Important")) || []
  );

  const [importantCompleted, setImportantCompleted] = useState(
    JSON.parse(localStorage.getItem(`Important Completed`)) || []
  );

  const [numberOfImportant, setNumberOfImportant] = useState(
    JSON.parse(localStorage.getItem("numberOfImportant")) || 0
  );

  useEffect(() => {
    localStorage.setItem(
      "numberOfImportant",
      JSON.stringify(numberOfImportant)
    );
  }, [numberOfImportant]);

  useEffect(() => {
    localStorage.setItem("Inbox", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(`Inbox Completed`, JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem("Important", JSON.stringify(importantTasks));
  }, [importantTasks]);

  useEffect(() => {
    localStorage.setItem(
      `Important Completed`,
      JSON.stringify(importantCompleted)
    );
  }, [importantCompleted]);

  function toggleSidebar() {
    setSidebarIsOpen((prevState) => !prevState);
  }

  function handlePageChange(page) {
    setPage(page);
  }

  function changeTheme(colorIndex) {
    setCurrentTheme(themeColors[colorIndex].color);
  }

  return (
    <main className="text-base font-extralight tracking-wide overflow-hidden h-screen">
      <Header currentTheme={currentTheme} toggleSidebar={toggleSidebar} />

      <div className="flex h-full">
        <Sidebar
          isOpen={sidebarIsOpen}
          changePage={handlePageChange}
          themeColors={themeColors}
          changeTheme={changeTheme}
        />

        <section className="flex flex-grow justify-center p-8 border-2">
          {page === "Inbox" && (
            <TodoList
              page={page}
              tasks={tasks}
              setTasks={setTasks}
              completedTasks={completedTasks}
              setCompletedTasks={setCompletedTasks}
              numberOfImportant={numberOfImportant}
              setNumberOfImportant={setNumberOfImportant}
            />
          )}
          {page === "Important" && (
            <ImportantTasks
              page={page}
              tasks={importantTasks}
              setTasks={setImportantTasks}
              completedTasks={importantCompleted}
              setCompletedTasks={setImportantCompleted}
              numberOfImportant={numberOfImportant}
              setNumberOfImportant={setNumberOfImportant}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
