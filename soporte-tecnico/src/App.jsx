import { useState } from "react";
import { Headset } from "lucide-react";
import SolicitudForm from "@/components/SolicitudForm";
import ListaSolicitudes from "@/components/ListaSolicitudes";
import FiltrosSolicitudes from "@/components/FiltrosSolicitudes";
import { solicitudesIniciales } from "@/data/solicitudesIniciales";

function App() {
  // App es el componente padre: aquí viven las solicitudes y el filtro elegido
  const [solicitudes, setSolicitudes] = useState(solicitudesIniciales);
  const [filtro, setFiltro] = useState("todas");

  const agregarSolicitud = (datos) => {
    const nueva = {
      ...datos,
      id: Date.now(),
      estado: "pendiente",
      fecha: new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" }),
    };
    setSolicitudes([nueva, ...solicitudes]);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(
      solicitudes.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
    );
  };

  const eliminarSolicitud = (id) => {
    setSolicitudes(solicitudes.filter((s) => s.id !== id));
  };

  // Cuántas hay de cada estado (se lo paso a los filtros para mostrar los contadores)
  const conteos = {
    todas: solicitudes.length,
    pendiente: solicitudes.filter((s) => s.estado === "pendiente").length,
    "en proceso": solicitudes.filter((s) => s.estado === "en proceso").length,
    resuelta: solicitudes.filter((s) => s.estado === "resuelta").length,
  };

  const solicitudesFiltradas =
    filtro === "todas" ? solicitudes : solicitudes.filter((s) => s.estado === filtro);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-7">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Headset className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Mesa de Ayuda TI</h1>
            <p className="text-sm text-primary-foreground/75">
              Registra lo que te está fallando y el equipo de soporte lo atiende.
            </p>
          </div>
          <div className="ml-auto hidden gap-6 text-right sm:flex">
            <div>
              <p className="text-2xl font-semibold">{conteos.pendiente}</p>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">por atender</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{conteos.resuelta}</p>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">resueltas</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[360px_1fr]">
        <SolicitudForm onAgregar={agregarSolicitud} />

        <section className="space-y-4">
          <FiltrosSolicitudes filtroActual={filtro} onFiltrar={setFiltro} conteos={conteos} />
          <ListaSolicitudes
            solicitudes={solicitudesFiltradas}
            filtro={filtro}
            onCambiarEstado={cambiarEstado}
            onEliminar={eliminarSolicitud}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
