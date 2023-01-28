import React from "react";
import style from "../css/style.css";

function Task({ task, index, deleteTask, getSingleTask, setToComplete }) {
  return (
    <>
      <div>
        <p className={task.completed ? "taskIsComplete" : "taskInComplete"}>
          <b>{index + 1}. </b>
          {task.taskName}
        </p>

        <button
          onClick={() => {
            deleteTask(task._id);
          }}
        >
          DELETE TASK
        </button>
        <button
          onClick={() => {
            getSingleTask(task);
          }}
        >
          EDIT TASK
        </button>
        <button
          onClick={() => {
            setToComplete(task);
          }}
        >
          COMPLETE
        </button>
      </div>
    </>
  );
}

export default Task;
