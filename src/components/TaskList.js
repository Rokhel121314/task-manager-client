import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Axios from "axios";
import { URL } from "../App";
import loadGif from "../assets/loading-gif.gif";

function TaskList() {
  const [formData, setFormData] = useState({
    taskName: "",
    completed: false,
  });
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const { taskName } = formData;
  //   console.log("tasks", tasks.length);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   adding task function
  const createTask = async (e) => {
    e.preventDefault();
    if (taskName === "") {
      return console.log("cant be empty");
    }
    try {
      await Axios.post(`${URL}/api/tasks`, formData);
      console.log("task added");
      setFormData({ ...formData, taskName: "" });
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await Axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const compTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTask(compTask);
  }, [tasks]);

  const getSingleTask = async (task) => {
    setFormData({ taskName: task.taskName, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (taskName === "") {
      return console.log("input field cant be empty");
    }
    try {
      await Axios.put(`${URL}/api/tasks/${taskId}`, formData);
      setFormData({ ...formData, taskName: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const setToComplete = async (task) => {
    const newFormData = {
      taskName: task.taskName,
      completed: true,
    };
    try {
      await Axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h2>Task Manager</h2>
      <TaskForm
        taskName={taskName}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="tasktab">
          <p>
            <b>Total tasks :</b> {tasks.length}
          </p>
          <p>
            <b>Completed task :</b> {completedTasks.length}
          </p>
          <hr />
        </div>
      )}

      {isLoading && (
        <div>
          <img src={loadGif} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p>No Task Added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                updateTask={updateTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </>
  );
}

export default TaskList;
