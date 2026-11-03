import { Trash2, User, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const colorPrioridad = {
  baja: "bg-sky-100 text-sky-800",
  media: "bg-amber-100 text-amber-800",
  alta: "bg-rose-100 text-rose-700",
};

const bordePrioridad = {
  baja: "border-l-sky-400",
  media: "border-l-amber-400",
  alta: "border-l-rose-500",
};

const colorEstado = {
  pendiente: "text-orange-700",
  "en proceso": "text-blue-700",
  resuelta: "text-emerald-700",
};

// Muestra una sola solicitud. Cuando cambio el estado o elimino,
// llama a las funciones que le llegaron por props (y App actualiza la lista)
function SolicitudItem({ solicitud, onCambiarEstado, onEliminar }) {
  const resuelta = solicitud.estado === "resuelta";

  return (
    <li>
      <Card
        className={`gap-3 border-l-4 px-5 py-4 transition-shadow hover:shadow-md ${bordePrioridad[solicitud.prioridad]} ${
          resuelta ? "opacity-75" : ""
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`font-medium ${resuelta ? "line-through decoration-1" : ""}`}>
                {solicitud.titulo}
              </h3>
              <Badge className={colorPrioridad[solicitud.prioridad]}>
                Prioridad {solicitud.prioridad}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{solicitud.descripcion}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Eliminar solicitud"
            className="text-muted-foreground hover:bg-rose-50 hover:text-rose-600"
            onClick={onEliminar}
          >
            <Trash2 />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><User className="size-3.5" /> {solicitud.solicitante}</span>
          <span className="flex items-center gap-1"><CalendarDays className="size-3.5" /> {solicitud.fecha}</span>
          <div className="ml-auto flex items-center gap-2">
            <span>Estado:</span>
            <Select value={solicitud.estado} onValueChange={onCambiarEstado}>
              <SelectTrigger size="sm" className={`w-36 font-medium ${colorEstado[solicitud.estado]}`} aria-label="Estado">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="en proceso">En proceso</SelectItem>
                <SelectItem value="resuelta">Resuelta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default SolicitudItem;
