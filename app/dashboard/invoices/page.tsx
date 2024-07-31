  import Pagination from '@/app/ui/invoices/pagination';
  import Search from '@/app/ui/search';
  import Table from '@/app/ui/invoices/table';
  import { CreateInvoice } from '@/app/ui/invoices/buttons';
  import { lusitana } from '@/app/ui/fonts';
  import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
  import { Suspense } from 'react';
  import { fetchInvoicesPages } from '@/app/lib/data';
  import { Metadata } from 'next';
 

  export const metadata: Metadata = {
    title: 'R&L FINANCIAL',
  };
  
// Este componente muestra una lista de facturas con la posibilidad de buscar, crear nuevas facturas,
// y navegar entre diferentes páginas de facturas.

  export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

      // Obtiene el valor de búsqueda de los parámetros o usa una cadena vacía por defecto
    const query = searchParams?.query || '';
      // Obtiene el número de página actual o usa 1 por defecto
    const currentPage = Number(searchParams?.page) || 1;

      // Obtiene el número total de facturas basado en la consulta de búsqueda, como por cada usuario
    const totalPages = await fetchInvoicesPages(query);

    return (
      <div className="w-full">

        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Facturas</h1>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar facturas..." />
          <CreateInvoice />
        </div>
       
        {/* Suspense para cargar la tabla de facturas con un fallback mientras se obtienen los datos */}
      {/* La clave de Suspense se basa en la consulta y la página actual para manejar la carga de manera adecuada */}
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
        
        <div className="mt-5 flex w-full justify-center">
     {/* Componente de paginación para navegar entre las páginas de facturas */}
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  }