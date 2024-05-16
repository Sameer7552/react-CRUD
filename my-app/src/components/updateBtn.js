import React from 'react';

function UpdateButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <i
        className="fa-duotone fa-edit fa-xl"
        style={{
          "--fa-primary-color": "#000000",
          "--fa-secondary-color": "#a3a3a3",
          "--fa-secondary-opacity": ".8",
        }}
      ></i>
    </button>
  );
}

export default UpdateButton;
