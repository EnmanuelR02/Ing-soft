import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;  // Obtiene el ID de la factura

      // Realiza llamadas a la API para obtener datos de la factura específica y la lista de clientes
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id), // Obtiene los datos de la factura por ID
        fetchCustomers(),// Aqui obtiene la lista de clientes
      ]);
      if (!invoice) {
        notFound();
      }

    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Factura', href: '/dashboard/invoices' },
          {
            label: 'Editar Factura',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
            {/* Formulario de edición de la factura con los datos obtenidos */}
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}