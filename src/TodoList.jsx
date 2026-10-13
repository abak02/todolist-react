
import { useEffect, useState } from "react";
import { toTitleCase } from "../utils/case";

export default function TodoList() {
  const [tasks, setTasks] = useState(()=>{
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (task.trim() === "") return;
    const updatedTasks = [
      ...tasks,
      {
        id: Date.now(),
        text: toTitleCase(task),
        completed: false,
      },
    ]
    setTasks(updatedTasks);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-serif font-bold text-emerald-500 mb-2">
          My Todo List
        </h1>

        <p className="text-gray-400 mb-6">
          Keep track of your daily tasks.
        </p>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Enter a new task..."
            className="flex-1 min-w-0 border border-gray-300 rounded-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addTask}
            className="bg-slate-600 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-all"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-md shadow-slate-200"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
                className="h-5 w-5 accent-blue-600 appearance-none border-2 rounded-full border-gray-400 checked:bg-cyan-950 hover:"
              />

              <span
                className={`flex-1 break-word ${
                  item.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {item.text}
              </span>

              <button
                onClick={() => deleteTask(item.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                aria-label="Delete task"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <hr className="mt-5 text-gray-300 rounded-full" />
        <p className="text-sm text-gray-500 mt-3">
          {tasks.filter((item) => !item.completed).length}
          {" "}tasks remaining
        </p>

      </div>
    </div>
  );
}
