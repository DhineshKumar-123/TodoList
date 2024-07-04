import React, { useState, useEffect } from 'react';
import Task from './Task';
import './App.css'; // Assuming you have a Task.css file for styles

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id, newText) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value) {
            addTask(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
