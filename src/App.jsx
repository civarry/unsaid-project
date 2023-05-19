import {Header} from './components/Header'
import { Tasks } from './components/Tasks'
import { useState } from 'react';
import { useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'todo:savedTasks';

function App() {
  const [tasks, setTasks] = useState([]);
  
  function loadSaveTasks(){
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(saved);
    if(saved){
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSaveTasks();
  }, [])

  function setTaskAndSave(newTasks){
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle){
    setTaskAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ]);
  }

  function deleteTaskById(taskId){
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTaskAndSave(newTasks);
  }

  function toggleTaskCompletedByID(taskId){
    const newTask = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task; 
    });
    setTaskAndSave(newTask);
  }

  return (
    <>
      <Header onAddTask={addTask}/>
      <Tasks tasks={tasks} onDelete={deleteTaskById} onComplete={toggleTaskCompletedByID}/>
    </>
  )
}

export default App
