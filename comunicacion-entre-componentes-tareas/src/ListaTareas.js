// src/ListaTareas.js
import React from 'react';
import Tarea from './Tarea';

function ListaTareas({ tareas, eliminarTarea }) {
  return (
    <ul>
      {tareas.map((tarea, index) => (
        <Tarea key={index} tarea={tarea} onDelete={() => eliminarTarea(index)} />
      ))}
    </ul>
  );
}

export default ListaTareas;
