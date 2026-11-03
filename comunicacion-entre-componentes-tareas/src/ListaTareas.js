import React from 'react';
import Tarea from './Tarea';

function ListaTareas({ tareas, eliminarTarea, editarTarea, toggleCompletada }) {
  return (
    <ul>
      {tareas.map((tarea, index) => (
        <Tarea
          key={index}
          tarea={tarea.texto}
          completada={tarea.completada}
          onDelete={() => eliminarTarea(index)}
          onEdit={(nuevoTexto) => editarTarea(index, nuevoTexto)}
          onToggleCompletada={() => toggleCompletada(index)}
        />
      ))}
    </ul>
  );
}

export default ListaTareas;
