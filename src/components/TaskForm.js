import React from "react";

function TaskForm({
  createTask,
  taskName,
  handleInputChange,
  isEditing,
  updateTask,
}) {
  return (
    <>
      <form onSubmit={isEditing ? updateTask : createTask}>
        <input
          type="text"
          placeholder="Add a task"
          name="taskName"
          value={taskName}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Edit" : "Add"}</button>
      </form>
    </>
  );
}

export default TaskForm;
