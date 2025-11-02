import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import TaskFilters from "./components/TaskFilters";
import CalendarView from "./components/CalendarView";
import storage from "./utils/storage";
import useNotifications from "./hooks/useNotifications";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = storage.load();
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    storage.save(tasks);
  }, [tasks]);

  useNotifications(tasks);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>🎓 Student ToDo App</h1>
      <AddTask onAdd={addTask} />
      <TaskFilters filter={filter} setFilter={setFilter} />
      <ul className="task-list">
        {filteredTasks.map((t) => (
          <TaskItem key={t.id} task={t} onToggle={toggleTask} />
        ))}
      </ul>
      <h2>📅 Calendar View</h2>
      <CalendarView tasks={tasks} />
    </div>
  );
}
