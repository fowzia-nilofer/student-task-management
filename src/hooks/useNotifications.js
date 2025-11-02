import { useEffect } from "react";

export default function useNotifications(tasks) {
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const now = new Date();
    tasks.forEach((t) => {
      if (t.deadline && !t.completed) {
        const due = new Date(t.deadline);
        if (due < now) {
          new Notification("Task Overdue!", {
            body: `${t.title} was due at ${due.toLocaleString()}`,
          });
        }
      }
    });
  }, [tasks]);
}
