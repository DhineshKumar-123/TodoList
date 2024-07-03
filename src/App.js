import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css'; // Import the CSS file

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
}

export default App;
