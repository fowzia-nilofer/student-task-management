import React from "react";

export default function TaskFilters({ filter, setFilter }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
      <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>Pending</button>
      <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
    </div>
  );
}
