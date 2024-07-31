import { ArrowPathIcon } from '@heroicons/react/24/outline'; 
import clsx from 'clsx'; 
import Image from 'next/image'; 
import { lusitana } from '@/app/ui/fonts'; 
import { LatestInvoice } from '@/app/lib/definitions'; 
import { fetchLatestInvoices } from '@/app/lib/data';

// Componente principal que muestra las últimas facturas
export default async function LatestInvoices() { 
  // Obtiene las últimas facturas de la API
  const latestInvoices = await fetchLatestInvoices();

  // Devuelve el JSX para renderizar el componente
  return (
    <div className="flex w-full flex-col md:col-span-4">
      {/* Título del componente con la fuente personalizada */}
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Últimas facturas
      </h2>
      
      {/* Contenedor principal del componente */}
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {/* Recorre las facturas obtenidas y genera un div para cada una */}
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id} // Clave única para cada factura
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0, // Agrega una línea de borde superior a partir del segundo elemento
                  },
                )}
              >
                {/* Contenedor de la imagen y la información principal del cliente */}
                <div className="flex items-center">
                  {/* Imagen de perfil del cliente */}
                  <Image
                    src={invoice.image_url} // URL de la imagen del cliente
                    alt={`${invoice.name}'s profile picture`} // Texto alternativo para la imagen
                    className="mr-4 rounded-full" // Estilos de la imagen
                    width={32} // Ancho de la imagen
                    height={32} // Altura de la imagen
                  />
                  <div className="min-w-0">
                    {/* Nombre del cliente */}
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    {/* Correo electrónico del cliente, se ocultarae n pantallas pequeñas */}
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                {/* Monto de la factura */}
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div> 
        {/* Indicador de última actualización */}
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" /> {/* Icono de actualización */}
          <h3 className="ml-2 text-sm text-gray-500">Actualizado justo ahora</h3> {/* Texto de actualización */}
        </div>
      </div>
    </div>
  );
}
