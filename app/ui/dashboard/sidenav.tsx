import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';


// Componente de barra lateral de navegación
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* Enlace al logotipo, redirige a la página de inicio */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo /> {/* Componente del logotipo */}
        </div>
      </Link>
      
      {/* Contenedor para los enlaces de navegación y otros elementos */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* Enlaces de navegación */}
        <NavLinks />
        
        {/* Divisor visual en la barra lateral para pantallas medianas y grandes */}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        
        {/* Botón de cierre de sesión */}
        <form
          action={async () => {
            'use server'; // Directiva para ejecutar código del servidor
            await signOut(); // Llama a la función de cierre de sesión
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" /> {/* Ícono de cierre de sesión */}
            <div className="hidden md:block">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}