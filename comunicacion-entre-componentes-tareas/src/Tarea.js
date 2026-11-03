// src/Tarea.js
import React from 'react';

function Tarea({ tarea, onDelete }) {
  return (
    <li>
      {tarea}
      <button onClick={onDelete}>Eliminar</button>
    </li>
  );
}

export default Tarea;
