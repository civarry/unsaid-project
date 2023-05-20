import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function addTask(taskTitle, taskDescription) {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      description: taskDescription,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasksAndSave(updatedTasks);
  }

  function deleteTaskById(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(updatedTasks);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Tasks
                tasks={tasks.reverse()}
                onDelete={deleteTaskById}
                searchQuery={searchQuery}
              />
            }
          />
          <Route
            path="/add"
            element={<Header onAddTask={addTask} onSearch={handleSearch} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
