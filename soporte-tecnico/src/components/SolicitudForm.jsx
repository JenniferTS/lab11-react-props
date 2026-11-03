import { useEffect, useState } from "react";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const vacio = { titulo: "", descripcion: "", solicitante: "", prioridad: "media" };

// Recibe por props la función onAgregar que le manda App
function SolicitudForm({ onAgregar }) {
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // El mensaje de "registrada" se va solo después de unos segundos
  useEffect(() => {
    if (!enviado) return;
    const t = setTimeout(() => setEnviado(false), 3500);
    return () => clearTimeout(t);
  }, [enviado]);

  const cambiar = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
    setErrores({ ...errores, [campo]: undefined });
    setEnviado(false);
  };

  const validar = () => {
    const e = {};
    if (!datos.titulo.trim()) e.titulo = "Ponle un título a la solicitud.";
    if (!datos.descripcion.trim()) e.descripcion = "Cuéntanos qué está pasando.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validar();
    if (Object.keys(e2).length > 0) {
      setErrores(e2);
      setEnviado(false);
      return;
    }
    onAgregar({
      titulo: datos.titulo.trim(),
      descripcion: datos.descripcion.trim(),
      solicitante: datos.solicitante.trim() || "Anónimo",
      prioridad: datos.prioridad,
    });
    setDatos(vacio);
    setErrores({});
    setEnviado(true);
  };

  const hayErrores = Object.values(errores).some(Boolean);

  return (
    <Card className="h-fit border-t-4 border-t-accent-foreground/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Nueva solicitud</CardTitle>
        <CardDescription>Mientras más detalles des, más rápido te ayudamos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {hayErrores && (
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>Falta completar algunos datos</AlertTitle>
              <AlertDescription>Revisa los campos marcados en rojo.</AlertDescription>
            </Alert>
          )}
          {enviado && (
            <Alert className="border-secondary-foreground/20 bg-secondary text-secondary-foreground">
              <CircleCheck />
              <AlertTitle>¡Solicitud registrada!</AlertTitle>
              <AlertDescription>Ya aparece en la lista como pendiente.</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Ej.: No funciona el proyector del aula 3"
              value={datos.titulo}
              aria-invalid={!!errores.titulo}
              onChange={(e) => cambiar("titulo", e.target.value)}
            />
            {errores.titulo && <p className="text-xs text-destructive">{errores.titulo}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              rows={3}
              placeholder="¿Qué pasó? ¿Desde cuándo?"
              value={datos.descripcion}
              aria-invalid={!!errores.descripcion}
              onChange={(e) => cambiar("descripcion", e.target.value)}
            />
            {errores.descripcion && <p className="text-xs text-destructive">{errores.descripcion}</p>}
          </div>

          <div className="grid grid-cols-[1fr_130px] gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="solicitante">Tu nombre</Label>
              <Input
                id="solicitante"
                placeholder="Nombre y apellido"
                value={datos.solicitante}
                onChange={(e) => cambiar("solicitante", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Prioridad</Label>
              <Select value={datos.prioridad} onValueChange={(v) => cambiar("prioridad", v)}>
                <SelectTrigger className="w-full" aria-label="Prioridad">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Send /> Enviar solicitud
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SolicitudForm;
