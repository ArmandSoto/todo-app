import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

export default function TodoList(props) {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(props.page)) || []
  );
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem(`${props.page} completed`)) || []
  );
  const [taskPaneIsActive, setTaskPaneIsActive] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    name: "",
    id: "",
    isComplete: false,
  });

  useEffect(() => {
    localStorage.setItem(
      `${props.page} completed`,
      JSON.stringify(completedTasks)
    );
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem(props.page, JSON.stringify(tasks));
  }, [tasks]);

  const taskComponents = tasks.map((task, index) => {
    return (
      <TaskCard
        key={task.id + task.name}
        id={task.id}
        name={task.name}
        deleteTask={removeFromTasks}
        clearTask={removeFromCompletedTasks}
        editTask={handleEditTask}
        closePane={closePane}
        isComplete={task.isComplete}
        index={index}
        completeTask={completeTask}
        restoreTask={restoreTask}
      />
    );
  });

  const completedComponents = completedTasks.map((task, index) => {
    return (
      <TaskCard
        key={task.id + task.name}
        id={task.id + "2"} //remember to check what happens if we remove the 2
        name={task.name}
        deleteTask={removeFromTasks}
        clearTask={removeFromCompletedTasks}
        editTask={handleEditTask}
        closePane={closePane}
        isComplete={task.isComplete}
        index={index}
        completeTask={completeTask}
        restoreTask={restoreTask}
      />
    );
  });

  function removeFromCompletedTasks(taskId) {
    setCompletedTasks((prevTasks) => {
      const copyOfPrevTasks = [...prevTasks];
      const index = copyOfPrevTasks.findIndex((task) => task.id === taskId);
      copyOfPrevTasks.splice(index, 1);
      return [...copyOfPrevTasks];
    });
  }

  function removeFromTasks(taskId) {
    setTasks((prevTasks) => {
      //make sure not to modify prevTasks directly so fix this
      const index = prevTasks.findIndex((task) => task.id === taskId);
      prevTasks.splice(index, 1);
      return [...prevTasks];
    });
  }

  function restoreTask(taskId) {
    let itemToRestore;
    //look in completedTasks for a matching id
    setCompletedTasks((prevTasks) => {
      const copyOfTasks = [...prevTasks];
      const itemIndex = copyOfTasks.findIndex((task) => task.id === taskId);
      itemToRestore = copyOfTasks.splice(itemIndex, 1)[0];
      itemToRestore = { ...itemToRestore, isComplete: false };
      return [...copyOfTasks];
    });
    setTasks((prevList) => [...prevList, itemToRestore]);
  }

  /* these functions can be combined and refactored  */

  function completeTask(taskId) {
    let completedTask;
    setTasks((prevTasks) => {
      const copyOfTasks = [...prevTasks];
      const completedIndex = copyOfTasks.findIndex(
        (task) => task.id === taskId
      );
      completedTask = copyOfTasks.splice(completedIndex, 1)[0];
      completedTask = { ...completedTask, isComplete: true };
      return [...copyOfTasks];
    });

    setCompletedTasks((prevList) => [...prevList, completedTask]);
  }

  function closePane() {
    if (taskPaneIsActive) {
      setTaskPaneIsActive((prev) => !prev);
    }
  }

  //consider calling this createNewTask
  function addTask() {
    if (currentTask.name.trim().length > 0) {
      currentTask.id = nanoid();
      setTasks((prevTasks) => {
        return [...prevTasks, currentTask];
      });
    }
    setTaskPaneIsActive((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const hasKeyMatch = tasks.some((obj) => obj["id"] === currentTask.id);

    if (hasKeyMatch) {
      setTasks((prev) => {
        const taskArray = prev.map((item) =>
          item.id === currentTask.id ? currentTask : item
        );
        return taskArray;
      });
      setTaskPaneIsActive((prev) => !prev);
    } else {
      addTask();
    }

    setCurrentTask({
      name: "",
      id: "",
      isComplete: false,
    });
  }

  function handleEditTask(taskId) {
    if (taskId !== "") {
      const index = tasks.findIndex((task) => task.id === taskId);
      setCurrentTask({
        name: tasks[index].name,
        id: tasks[index].id,
        isComplete: false,
      });
      setTaskPaneIsActive((prev) => !prev);
    }
  }

  function handleChange(e) {
    setCurrentTask((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  }

  function handleClick() {
    setTaskPaneIsActive((prev) => !prev);
  }

  function drop(result) {
    if (!result || result.destination === null) {
      return;
    }
    let taskItemsCopy = [...tasks];
    const [reorderedItem] = taskItemsCopy.splice(result.source.index, 1);
    taskItemsCopy.splice(result.destination.index, 0, reorderedItem);
    setTasks(taskItemsCopy);
  }

  function dropForCompleted(result) {
    if (!result || result.destination === null) {
      return;
    }
    let completedItemsCopy = [...completedTasks];
    const [reorderedItem] = completedItemsCopy.splice(result.source.index, 1);
    completedItemsCopy.splice(result.destination.index, 0, reorderedItem);
    setCompletedTasks(completedItemsCopy);
  }

  return (
    <div className={"flex-column w-1/3"}>
      <div className={"flex-column"}>
        <DragDropContext onDragEnd={drop}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                className="flex-column space-between"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {taskComponents}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {completedTasks.length > 0 && <h2>Completed</h2>}
      <div className={"flex-column"}>
        <DragDropContext onDragEnd={dropForCompleted}>
          <Droppable droppableId="completedTodos">
            {(provided) => (
              <ul
                className="flex-column space-between"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {completedComponents}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex justify-center">
        {!taskPaneIsActive ? (
          <>
            <PlusCircleIcon
              onClick={handleClick}
              className="h-10 w-10 text-emerald-400"
            />
            <p className={tasks.length > 0 ? "hidden" : "leading-10 ml-5"}>
              You have no tasks currently
            </p>
          </>
        ) : (
          <>
            <TaskForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              currentTask={currentTask}
            />
          </>
        )}
      </div>
    </div>
  );
}
