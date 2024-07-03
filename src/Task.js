import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Task({ task, deleteTask, editTask, toggleTaskCompletion }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editTask(task.id, editText);
    setIsEditing(false);
  };

  return (
    <>
      <li className={task.completed ? 'completed' : ''}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
        />
        <span>{task.text}</span>
        <button onClick={handleEditClick} className="edit-task">Edit</button>
        <button onClick={() => deleteTask(task.id)} className="delete-task">Delete</button>
      </li>
      <Modal
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        contentLabel="Edit Task"
      >
        <h2>Edit Task</h2>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={handleSaveClick} className="save-task">Save</button>
        <button onClick={() => setIsEditing(false)} className="cancel-task">Cancel</button>
      </Modal>
    </>
  );
}

export default Task;
