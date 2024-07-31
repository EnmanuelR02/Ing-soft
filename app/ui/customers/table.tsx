import Image from 'next/image'; 
import { lusitana } from '@/app/ui/fonts'; 
import Search from '@/app/ui/search'; 
import {
  CustomersTableType,
  FormattedCustomersTable,
} from '@/app/lib/definitions'; 

// Componente que muestra una tabla de clientes
export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[]; // Propiedad que recibe una lista de clientes formateados
}) {
  return (
    <div className="w-full">
      {/* Título de la sección con fuente personalizada */}
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Clientes
      </h1>
      
      {/* Campo de búsqueda para filtrar clientes */}
      <Search placeholder="Buscar cliente..." />
      
      {/* Contenedor que maneja el diseño de la tabla de clientes */}
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            
            {/* Contenedor de la tabla con diseño responsivo */}
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              
              {/* Vista para dispositivos móviles */}
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id} // Asigna una clave única para cada cliente
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    {/* Contenedor para la información principal del cliente */}
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            {/* Imagen de perfil del cliente */}
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        {/* Correo electrónico del cliente */}
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    {/* Información sobre pagos pendientes y realizados */}
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pendiente</p>
                        <p className="font-medium">{customer.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pago</p>
                        <p className="font-medium">{customer.total_paid}</p>
                      </div>
                    </div>
                    {/* Total de facturas del cliente */}
                    <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} Facturas</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Vista para pantallas grandes (escritorio) */}
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total facturas
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total pendiente
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total pagado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      {/* Celda para la imagen y nombre del cliente */}
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      {/* Celda para el correo electrónico del cliente */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email}
                      </td>
                      {/* Celda para el total de facturas */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_invoices}
                      </td>
                      {/* Celda para el total pendiente */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_pending}
                      </td>
                      {/* Celda para el total pagado */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {customer.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
