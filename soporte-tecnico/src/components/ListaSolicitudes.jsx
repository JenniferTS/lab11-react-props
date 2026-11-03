import { Inbox } from "lucide-react";
import SolicitudItem from "@/components/SolicitudItem";

// Recibe la lista ya filtrada desde App y le pasa a cada item sus funciones
function ListaSolicitudes({ solicitudes, filtro, onCambiarEstado, onEliminar }) {
  if (solicitudes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-14 text-muted-foreground">
        <Inbox className="size-8" />
        <p>{filtro === "todas" ? "Todavía no hay solicitudes." : `No hay solicitudes "${filtro}".`}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {solicitudes.map((s) => (
        <SolicitudItem
          key={s.id}
          solicitud={s}
          onCambiarEstado={(estado) => onCambiarEstado(s.id, estado)}
          onEliminar={() => onEliminar(s.id)}
        />
      ))}
    </ul>
  );
}

export default ListaSolicitudes;
