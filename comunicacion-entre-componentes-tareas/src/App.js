// src/App.js
import React, { useState } from 'react';
import TareaForm from './TareaForm';
import ListaTareas from './ListaTareas';

function App() {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (texto) => {
    setTareas([...tareas, texto]);
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <TareaForm agregarTarea={agregarTarea} />
      <ListaTareas tareas={tareas} eliminarTarea={eliminarTarea} />
    </div>
  );
}

export default App;
