// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// export default function CalendarView({ tasks }) {
//   const [date, setDate] = useState(new Date());

//   const tasksOnDate = tasks.filter(
//     (t) => t.deadline && new Date(t.deadline).toDateString() === date.toDateString()
//   );

//   return (
//     <div className="calendar-view">
//       <Calendar value={date} onChange={setDate} />
//       <h3>Tasks on {date.toDateString()}:</h3>
//       <ul>
//         {tasksOnDate.length > 0 ? (
//           tasksOnDate.map((t) => <li key={t.id}>{t.title}</li>)
//         ) : (
//           <li>No tasks</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// src/components/CalendarView.jsx
import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

/**
 * CalendarView: renders a month calendar with tasks shown inside each day cell.
 * - Shows up to N tasks per tile (N=3). If more, shows "+n more".
 * - Clicking a day selects it and the tasks for that date are shown below.
 *
 * Expects `tasks` array where each task.deadline is a string parseable by Date.
 */
export default function CalendarView({ tasks }) {
  const [date, setDate] = useState(new Date());
  const MAX_PER_TILE = 3;

  // Map tasks by day string (toDateString) for fast lookup
  const tasksByDay = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (!t.deadline) return;
      const d = new Date(t.deadline);
      if (Number.isNaN(d.getTime())) return;
      const key = d.toDateString();
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    // optional: sort each day's tasks by priority or time
    Object.keys(map).forEach((k) => {
      map[k].sort((a, b) => {
        // sort by priority (High, Medium, Low) then by time
        const order = { High: 0, Medium: 1, Low: 2 };
        const oa = order[a.priority] ?? 1;
        const ob = order[b.priority] ?? 1;
        if (oa !== ob) return oa - ob;
        // earlier deadlines first
        return new Date(a.deadline) - new Date(b.deadline);
      });
    });
    return map;
  }, [tasks]);

  // content rendered inside each calendar tile (month view only)
  function tileContent({ date: tileDate, view }) {
    if (view !== "month") return null;
    const key = tileDate.toDateString();
    const tasksForDay = tasksByDay[key] || [];
    if (tasksForDay.length === 0) return null;

    // show up to MAX_PER_TILE small entries
    return (
      <ul className="calendar-tile-list" aria-hidden>
        {tasksForDay.slice(0, MAX_PER_TILE).map((t) => (
          <li
            className="calendar-tile-task"
            key={t.id}
            title={t.title + (t.deadline ? ` — ${new Date(t.deadline).toLocaleString()}` : "")}
          >
            <span
              className="calendar-dot"
              style={{
                background: t.priority === "High" ? "#e11d48" : t.priority === "Medium" ? "#f59e0b" : "#10b981",
              }}
            />
            <span className="calendar-task-title">
              {t.title.length > 20 ? t.title.slice(0, 18) + "…" : t.title}
            </span>
          </li>
        ))}
        {tasksForDay.length > MAX_PER_TILE && (
          <li className="calendar-more">+{tasksForDay.length - MAX_PER_TILE} more</li>
        )}
      </ul>
    );
  }

  // tasks for the selected day (below calendar)
  const selectedDayKey = date.toDateString();
  const tasksForSelectedDay = tasksByDay[selectedDayKey] || [];

  return (
    <div className="calendar-view">
      <Calendar value={date} onClickDay={setDate} onChange={setDate} tileContent={tileContent} />
      <div className="calendar-day-list">
        <h3>Tasks on {date.toDateString()} ({tasksForSelectedDay.length})</h3>
        {tasksForSelectedDay.length === 0 ? (
          <p>No tasks for this date.</p>
        ) : (
          <ul>
            {tasksForSelectedDay.map((t) => (
              <li key={t.id} className={`calendar-list-item ${t.completed ? "completed" : ""}`}>
                <strong>{t.title}</strong>
                {t.deadline && <span className="small"> — {new Date(t.deadline).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                <div className="small meta">
                  <span className="pill">{t.category}</span>
                  <span className="pill priority-pill">{t.priority}</span>
                </div>
                {t.desc && <p className="small desc">{t.desc}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
