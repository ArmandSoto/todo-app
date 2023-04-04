import TodoList from "./TodoList";

export default function ImportantTasks({
  page,
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
  otherTasks,
  setOtherTasks,
  otherCompleted,
  setOtherCompleted,
  numberOfImportant,
  setNumberOfImportant
}) {
  return (
    <div className="flex-col flex-grow items-center">
      <h2>Welcome to Your Important Tasks</h2>
      <div className="flex flex-grow justify-center">
        <TodoList
          page={page}
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          otherTasks={otherTasks}
          setOtherTasks={setOtherTasks}
          otherCompleted={otherCompleted}
          setOtherCompleted={setOtherCompleted}
          numberOfImportant={numberOfImportant}
          setNumberOfImportant={setNumberOfImportant}
          
        />
      </div>
    </div>
  );
}
