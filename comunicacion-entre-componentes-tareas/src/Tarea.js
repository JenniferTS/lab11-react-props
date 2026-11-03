import React, { useState } from 'react';

function Tarea({ tarea, onDelete, onEdit, completada, onToggleCompletada }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(tarea);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  return (
    <li>
      <input type="checkbox" checked={completada} onChange={onToggleCompletada} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSaveClick}>Guardar</button>
        </>
      ) : (
        <>
          {tarea}
          <button onClick={onDelete}>Eliminar</button>
          <button onClick={handleEditClick}>Editar</button>
        </>
      )}
    </li>
  );
}

export default Tarea;
