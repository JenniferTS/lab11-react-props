# Laboratorio 11 – Comunicación entre componentes

Desarrollo de Aplicaciones Empresariales · Sharon Trujillo Sulca · Grupo D

| Carpeta | Contenido |
|---|---|
| `comunicacion-entre-componentes-tareas/` | Parte guiada (create-react-app): lista de tareas con `TareaForm`, `ListaTareas`, `Tarea` y `Filtros`; agregar, eliminar, editar, marcar como completada y filtrar. |
| `soporte-tecnico/` | Tarea: **Mesa de Ayuda TI**, registro de solicitudes de soporte técnico con React + Vite + Tailwind CSS + shadcn/ui. |

## Parte guiada

```sh
cd comunicacion-entre-componentes-tareas
npm install
npm start
```

## Tarea: Mesa de Ayuda TI

```sh
cd soporte-tecnico
npm install
npm run dev
```

Componentes y cómo se comunican:

- `App` (padre): guarda `solicitudes` y `filtro` con `useState` y tiene las funciones `agregarSolicitud`, `cambiarEstado` y `eliminarSolicitud`.
- `SolicitudForm`: recibe `onAgregar`; valida título y descripción y le manda la nueva solicitud al padre.
- `FiltrosSolicitudes`: recibe `filtroActual`, `conteos` y `onFiltrar`; solo avisa al padre qué filtro se eligió.
- `ListaSolicitudes`: recibe la lista ya filtrada y le pasa a cada item sus funciones.
- `SolicitudItem`: muestra una solicitud y llama a `onCambiarEstado` / `onEliminar`.

`FiltrosSolicitudes` y `ListaSolicitudes` son hermanos: no se hablan directamente, se comunican a través de `App`.

shadcn/ui: Button, Card, Input, Label, Textarea, Select, Badge y Alert. Tipografía Outfit, paleta verde petróleo + durazno.
