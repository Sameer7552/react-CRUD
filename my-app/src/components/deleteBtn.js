// DeleteButton.js
import React from 'react';

function DeleteButton({ onConfirmDelete }) {
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      onConfirmDelete();
    }
  };

  return (
    <button onClick={handleDelete}>
      <i
        className="fa-duotone fa-trash fa-xl"
        style={{
          "--fa-primary-color": "#000000",
          "--fa-secondary-color": "#a3a3a3",
          "--fa-secondary-opacity": ".8",
        }}
      ></i>
    </button>
  );
}

export default DeleteButton;
