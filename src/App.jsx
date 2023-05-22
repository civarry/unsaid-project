import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { app, db } from "./firebase-config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const COLLECTION_NAME = "tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadSavedTasks();
  }, []);

  async function loadSavedTasks() {
    try {
      const docRef = doc(db, COLLECTION_NAME, "tasks");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTasks(docSnap.data().tasks);
      }
    } catch (error) {
      console.error("Error loading tasks from Firestore:", error);
    }
  }

  async function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    try {
      const docRef = doc(db, COLLECTION_NAME, "tasks");
      await setDoc(docRef, { tasks: newTasks });
      console.log("Tasks saved to Firestore");
    } catch (error) {
      console.error("Error saving tasks to Firestore:", error);
    }
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function addTask(taskTitle, taskDescription) {
    const newTask = {
      id: uuidv4(),
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
