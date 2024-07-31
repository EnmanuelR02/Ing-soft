import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions'; 

// Componente para crear facturas nuevas 
export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create" // Enlace a la página de creación de facturas
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear factura</span> 
      <PlusIcon className="h-5 md:ml-4" /> 
    </Link>
  );
}

// Componente para actualizar una factura 
export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`} // Enlace a la página de edición de facturas 
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" /> {/* Icono de lápiz para saber que es el boton de edición */}
    </Link>
  );
}

// Componente para eliminar una factura existente
export function DeleteInvoice({ id }: { id: string }) {
  // Enlaza la función deleteInvoice con el ID de la factura para eliminar
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);  
  return (
    <form action={deleteInvoiceWithId}> {/* Formulario que llama a la acción de eliminar al ser enviado */}
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Eliminar</span> 
        <TrashIcon className="w-4" /> {/* Icono de safacon para saber que es el boton de eliminar */}
      </button>
    </form>
  );
}
