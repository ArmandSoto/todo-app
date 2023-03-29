import TodoList from "./TodoList";

export default function ImportantTasks(props) {
  return (
      <div className="flex-col flex-grow items-center">

        <h2>Welcome to Your Important Tasks</h2>
        <div className="flex flex-grow justify-center">
        <TodoList page={props.page} />
        </div>
    </div>
  );
}
