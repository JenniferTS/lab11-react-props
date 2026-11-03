import React from 'react';

function Filtros({ filtrarTareas }) {
  return (
    <div>
      <button onClick={() => filtrarTareas("Todas")}>Todas</button>
      <button onClick={() => filtrarTareas("Pendientes")}>Pendientes</button>
      <button onClick={() => filtrarTareas("Completadas")}>Completadas</button>
    </div>
  );
}

export default Filtros;
