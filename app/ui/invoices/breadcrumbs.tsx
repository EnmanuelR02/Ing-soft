import { clsx } from 'clsx'; 
import Link from 'next/link'; 
import { lusitana } from '@/app/ui/fonts'; 


// Define la interfaz Breadcrumb para los elementos de la ruta de navegación
interface Breadcrumb {
  label: string; // Etiqueta visible del breadcrumb
  href: string; // URL de destino al hacer clic
  active?: boolean; // Indica si el breadcrumb es el actual
}

// Componente Breadcrumbs que renderiza una lista de elementos de navegación
export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[]; // Define la prop breadcrumbs como una lista de objetos Breadcrumb
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href} // Utiliza href como clave única
            aria-current={breadcrumb.active ? "page" : undefined} // Marca el elemento actual de la ruta
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500', // Clase para el estilo del texto
            )}
          >
            {/* Enlace al destino especificado */}
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {/* Separador de elementos, mostrado solo si no es el último breadcrumb */}
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
