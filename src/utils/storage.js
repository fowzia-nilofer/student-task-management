const storageKey = "student_todo_tasks";

const storage = {
  save: (tasks) => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  },
  load: () => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  },
};

export default storage;
