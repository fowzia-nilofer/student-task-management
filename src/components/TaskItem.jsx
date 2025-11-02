import React from "react";

export default function TaskItem({ task, onToggle }) {
  const { id, title, desc, deadline, category, priority, completed } = task;

  const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  return (
    <li
      className={`task-item ${completed ? "completed" : ""}`}
      onClick={() => onToggle(id)}
    >
      <div>
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
        {deadline && <p>⏰ {new Date(deadline).toLocaleString()}</p>}
        <p>📂 {category}</p>
      </div>
      <span
        className="priority"
        style={{ background: priorityColors[priority] }}
      >
        {priority}
      </span>
    </li>
  );
}
