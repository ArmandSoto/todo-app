import { useState } from "react";


export default function TaskForm(props) {

 
  return (
    <form
      onSubmit={(e) => props.handleSubmit(e, props.currentTask)}
      className={`${
        props.inputIsFocused ? "scale-125" : "scale-100"
      } mt-8 transition ease-in-out delay-50 flex-col w-full bg-white border-2 rounded-md p-2 justify-around`}
    >
      <div>
        <input
          className="border-none p-2 outline-none"
          type="text"
          name="task-name"
          onChange={props.handleChange}
          value={props.currentTask.name}
          placeholder="Enter a Task..."
          onFocus={props.handleInputFocus}
          autoFocus
        />
      </div>
      <div className="flex justify-end">
        <button className=" border-2 rounded-lg p-2 h-fit text-white bg-purple-400">
          {" "}
          Cancel
        </button>
        <button
          className="border-2 rounded-lg p-2 h-fit text-white bg-red-500"
          type="submit"
        >
          {" "}
          Add Task{" "}
        </button>
      </div>
    </form>
  );
}
