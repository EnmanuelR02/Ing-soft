"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Mapa de enlaces a mostrar en la navegación lateral.
// Dependiendo del tamaño de la aplicación, esto podría almacenarse en una base de datos.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

// Componente que renderiza los enlaces de navegación
export default function NavLinks() {
  // Obtiene la ruta actual usando el hook usePathname de Next.js
  const pathname = usePathname();

  return (
    <>
      {/* Mapea los enlaces definidos y renderiza un componente Link para cada uno */}
      {links.map((link) => {
        // Asigna el icono correspondiente al enlace
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.name} // Clave única para cada enlace
            href={link.href} // URL de destino del enlace
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                // Clases condicionales: si la ruta actual coincide con el enlace, se aplican estilos adicionales
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            {/* Renderiza el icono del enlace */}
            <LinkIcon className="w-6" />
            {/* Muestra el nombre del enlace, oculto en dispositivos pequeños */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}