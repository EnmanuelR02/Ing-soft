'use client'; // Indica que este archivo es específico para el cliente en Next.js

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Importa un ícono de búsqueda
import { useSearchParams, usePathname, useRouter } from 'next/navigation'; // Hooks de Next.js para navegación y manejo de URL
import { useDebouncedCallback } from 'use-debounce'; // Importa una función para manejar la llamada con retardo

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // Obtiene los parámetros de búsqueda actuales de la URL
  const pathname = usePathname(); // Obtiene la ruta actual
  const { replace } = useRouter(); // Función para reemplazar la URL en la navegación

  // Crea una función con retardo para manejar la búsqueda
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`); // Imprime en consola el término de búsqueda

    const params = new URLSearchParams(searchParams); // Crea un nuevo objeto URLSearchParams con los parámetros actuales
    params.set('page', '1'); // Resetea la página a 1 cada vez que se hace una búsqueda
    if (term) {
      params.set('query', term); // Si hay un término, lo añade a los parámetros de búsqueda
    } else {
      params.delete('query'); // Si no hay término, elimina el parámetro de búsqueda
    }
    // Actualiza la URL con los nuevos parámetros de búsqueda
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Retardo de 300 ms para evitar llamadas excesivas mientras el usuario escribe

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder} // Placeholder proporcionado como prop
        onChange={(e) => {
          handleSearch(e.target.value); // Llama a handleSearch cada vez que cambia el valor del input
        }}
        defaultValue={searchParams.get('query')?.toString()} // Establece el valor predeterminado del input basado en la URL
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
