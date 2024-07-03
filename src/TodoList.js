import React, { useState } from 'react';
import Task from './Task';


function TodoList({ tasks, addTask, deleteTask, editTask, toggleTaskCompletion }) {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddClick = () => {
    if (newTaskText.trim() === '') return;
    addTask(newTaskText);
    setNewTaskText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
        />
        <button onClick={handleAddClick} className="add-task">Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
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

export default TodoList;
