import { Button } from "@/components/ui/button";

const opciones = [
  { valor: "todas", texto: "Todas" },
  { valor: "pendiente", texto: "Pendientes" },
  { valor: "en proceso", texto: "En proceso" },
  { valor: "resuelta", texto: "Resueltas" },
];

// No guarda nada: solo avisa al padre qué filtro se eligió con onFiltrar
function FiltrosSolicitudes({ filtroActual, onFiltrar, conteos }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border bg-card p-2">
      {opciones.map((op) => (
        <Button
          key={op.valor}
          variant={filtroActual === op.valor ? "default" : "ghost"}
          className="rounded-xl"
          onClick={() => onFiltrar(op.valor)}
        >
          {op.texto}
          <span
            className={`rounded-full px-1.5 text-xs ${
              filtroActual === op.valor ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
            }`}
          >
            {conteos[op.valor]}
          </span>
        </Button>
      ))}
    </div>
  );
}

export default FiltrosSolicitudes;
