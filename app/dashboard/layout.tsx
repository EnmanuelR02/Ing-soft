  import SideNav from '@/app/ui/dashboard/sidenav';
  
  export const experimental_ppr = true;


  // Componente Layout
// Este componente define la estructura del layout para la página,
// con una barra lateral de navegación y un área de contenido principal.
// La disposición cambia de una columna en pantallas pequeñas a una fila en pantallas más grandes.
  export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          {/* Contenedor para la barra lateral de navegación */}
      {/* En pantallas pequeñas, el ancho es completo, en pantallas más grandes, tiene un ancho fijo */}
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
         {/* Contenedor para el contenido principal */}
      {/* En pantallas pequeñas, ocupa toda la pantalla, en pantallas más grandes, tiene un padding mayor y permite el scroll vertical */}
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    );
  }