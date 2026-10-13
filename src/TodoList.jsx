
import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

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

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          My Todo List
        </h1>

        <p className="text-gray-500 mb-6">
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
            className="bg-slate-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
                className="h-4 w-4 accent-blue-600"
              />

              <span
                className={`flex-1 break-words ${
                  item.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {item.text}
              </span>

              <button
                onClick={() => deleteTask(item.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete task"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mt-5">
          {tasks.filter((item) => !item.completed).length}
          {" "}tasks remaining
        </p>

      </div>
    </div>
  );
}
