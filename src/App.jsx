import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { useState } from "react";
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function loadSaveTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(saved);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSaveTasks();
  }, []);

  function setTaskAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function addTask(taskTitle, taskDescription) {
    setTaskAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        description: taskDescription,
      },
    ]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTaskAndSave(newTasks);
  }

  return (
    <>
      <Header onAddTask={addTask} onSearch={handleSearch} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        searchQuery={searchQuery}
      />
    </>
  );
}

export default App;
