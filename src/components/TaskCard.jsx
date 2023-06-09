import { useState } from "react";
import { Draggable, useTouchSensor } from "react-beautiful-dnd";
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function TaskCard(props) {
  const [showEllipsis, setShowEllipsis] = useState(false);
  const [isComplete, setIsComplete] = useState(props.isComplete);
  const [isImportant, setIsImportant] = useState(props.isImportant)

  function checkboxChangeHandler() {
    let markedAsComplete = !isComplete;

    setIsComplete(markedAsComplete);


    props.updateTask(props.id, markedAsComplete)
  }

  function markAsImportantHandler(){
    let markedAsImportant = !isImportant

    setIsImportant(prev => !prev)

    props.markImportantTask(props.id, isComplete, markedAsImportant)
  }

  

  //remember to take a look at this index part because props.id will no longer be a number
  return (
    <Draggable
      key={props.id + props.index}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <div
          className="border-2 shadow-lg rounded-lg my-2 p-4 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <li
            className="flex"
            onMouseEnter={() => setShowEllipsis(true)}
            onMouseLeave={() => setShowEllipsis(false)}
          >
            <input
              type="checkbox"
              className="mr-3"
              checked={isComplete}
              onChange={checkboxChangeHandler}
            />
            <p className={isComplete ? "line-through" : ""}>{props.name} </p>

            {showEllipsis && (
              <div className="flex ml-auto">
                <PencilSquareIcon
                  className="h-6 w-6"
                  onClick={() => {
                    props.editTask(props.id);
                  }}
                />
                <EllipsisHorizontalIcon className="h-6 w-6" />
                <StarIcon className={`${isImportant ? "text-yellow-500" : ""} h-6 w-6`} onClick={() => {
                  markAsImportantHandler(props.id)
                }} />
                <TrashIcon
                  className="h-6 w-6 inline-block ml-3 text-red-600"
                  onClick={(e) => {
                    props.removeFromTasks(props.id, isComplete)
                  }}
                />
              </div>
            )}
          </li>
        </div>
      )}
    </Draggable>
  );
}
