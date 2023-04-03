import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

export default function TodoList({
  page,
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
  numberOfImportant,
  setNumberOfImportant,
}) {
  const [taskPaneIsActive, setTaskPaneIsActive] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    name: "",
    id: "",
    isComplete: false,
    isImportant: false,
  });

  const taskComponents = tasks.map((task, index) => {
    return (
      <TaskCard
        key={task.id + task.name}
        id={task.id}
        name={task.name}
        removeFromTasks={removeFromTasks}
        editTask={handleEditTask}
        closePane={closePane}
        isComplete={task.isComplete}
        isImportant={task.isImportant}
        index={index}
        updateTask={updateTask}
        markImportantTask={markImportantTask}
      />
    );
  });

  const completedComponents = completedTasks.map((task, index) => {
    return (
      <TaskCard
        key={task.id + task.name}
        id={task.id} // removed the 2 so I think its okay to have id be duplicate
        name={task.name}
        removeFromTasks={removeFromTasks}
        editTask={handleEditTask}
        closePane={closePane}
        isComplete={task.isComplete}
        isImportant={task.isImportant}
        index={index}
        updateTask={updateTask}
        markImportantTask={markImportantTask}
      />
    );
  });

  function removeFromTasks(taskId, isCompleted = false) {
    const setTasksFunction = isCompleted ? setCompletedTasks : setTasks;
    setTasksFunction((prevTasks) => {
      const copyOfPrevTasks = [...prevTasks];
      const index = copyOfPrevTasks.findIndex((task) => task.id === taskId);
      const deletedTask = copyOfPrevTasks.splice(index, 1)[0];
      setNumberOfImportant(count => {
        return deletedTask.isImportant ? count - 1 : count;
      })

      return [...copyOfPrevTasks];
    });
  }

  function updateTask(taskId, isComplete = false) {
    let itemToRestore;
    let setTaskFunction = isComplete ? setTasks : setCompletedTasks;
    setTaskFunction((prevTasks) => {
      const copyOfTasks = [...prevTasks];
      const itemIndex = copyOfTasks.findIndex((task) => task.id === taskId);
      itemToRestore = copyOfTasks.splice(itemIndex, 1)[0];
      itemToRestore = { ...itemToRestore, isComplete: isComplete };
      return [...copyOfTasks];
    });

    setTaskFunction = isComplete ? setCompletedTasks : setTasks;
    setTaskFunction((prevList) => [...prevList, itemToRestore]);
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

  function handleSubmit(e, task) {
    e.preventDefault();
    let hasKeyMatch = task.isComplete
      ? completedTasks.some((obj) => obj["id"] === currentTask.id)
      : tasks.some((obj) => obj["id"] === currentTask.id);



    let tasksSetter = task.isComplete ? setCompletedTasks : setTasks;
    if (hasKeyMatch) {
      tasksSetter((prev) => {
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
      isImportant: false,
    });
  }

  function handleEditTask(taskId) {
    //we have to figure out which array to check based on how the index turns out
    let copyOfTasks = null;

    if (taskId !== "") {
      let index = tasks.findIndex((task) => task.id === taskId);

      if (index < 0) {
        index = completedTasks.findIndex((task) => task.id === taskId);
        copyOfTasks = [...completedTasks];
      } else {
        copyOfTasks = [...tasks];
      }
      setCurrentTask({
        name: copyOfTasks[index].name,
        id: copyOfTasks[index].id,
        isComplete: copyOfTasks[index].isComplete,
        isImportant: false,
      });
      setTaskPaneIsActive((prev) => !prev);
    }
  }

  function markImportantTask(taskId, isCompleted = false, isImportant) {
    let copyOfTasks = isCompleted ? [...completedTasks] : [...tasks];
    const index = copyOfTasks.findIndex((item) => {
      
      return item.id === taskId;
    });
    let importantTask = copyOfTasks.splice(index, 1)[0];
    setNumberOfImportant((count) => {
      return isImportant ? count + 1 : count - 1;
    });

    copyOfTasks.splice(index, 0, {
      ...importantTask,
      isImportant: isImportant,
    });
    isCompleted ? setCompletedTasks(copyOfTasks) : setTasks(copyOfTasks);
    
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

  function drop(result, dropArea) {
    if (!result || result.destination === null) {
      return;
    }
    let taskItemsCopy = dropArea === "todos" ? [...tasks] : [...completedTasks];
    let tasksSetter = dropArea === "todos" ? setTasks : setCompletedTasks;
    const [reorderedItem] = taskItemsCopy.splice(result.source.index, 1);
    taskItemsCopy.splice(result.destination.index, 0, reorderedItem);
    tasksSetter(taskItemsCopy);
  }

  return (
    <div className={"flex-column w-1/3"}>
      <div className={"flex-column"}>
        <DragDropContext
          onDragEnd={(result) => {
            drop(result, "todos");
          }}
        >
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
        <DragDropContext
          onDragEnd={(result) => {
            drop(result, "completed");
          }}
        >
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
