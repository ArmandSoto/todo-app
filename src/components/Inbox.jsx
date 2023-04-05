import TodoList from "./TodoList";
import { BookOpenIcon } from "@heroicons/react/24/outline";

//show the day of the week next to the what's next

export default function Inbox({
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
  setNumberOfImportant,
}) {
  return (
    <div className="flex-col flex-grow items-center">
    <div className="flex items-center">
      {/* <h2 className="text-3xl  text-gray-700 font-bold p-2">
        What's Next?
      </h2> */}
      <BookOpenIcon className="h-6 w-6 tracking-wide stroke-yellow-500" />

    </div>

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
          setOtherCompletd={setOtherCompleted}
          numberOfImportant={numberOfImportant}
          setNumberOfImportant={setNumberOfImportant}
        />
      </div>
    </div>
  );
}
