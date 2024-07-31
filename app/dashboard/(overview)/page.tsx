import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import 
{ RevenueChartSkeleton, 
LatestInvoicesSkeleton,
CardsSkeleton,} from '@/app/ui/skeletons';
import { Metadata } from 'next';


// Definición de los metadatos para la página del dashboard
// Y aqui se incluye el título que aparecerá en la pestaña del navegador
export const metadata: Metadata = {
  title: 'Financial',
}; 


// Componente principal de la página del dashboard
// Este componente carga y muestra los datos generales del dashboard,
// incluyendo el número de facturas, clientes, y el estado de las facturas (pagadas y pendientes).
// Se utiliza Suspense para mostrar componentes de carga mientras se obtienen los datos.
export default async function Page() {
  
    // Obtención de datos para las tarjetas del dashboard
  // Los datos incluyen el número total de facturas, número de clientes, facturas pagadas y pendientes
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
        {/* Aqui esta el título del dashboard*/}

      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        General
      </h1>

         {/* Contenedor para las tarjetas del dashboard  */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
         {/* Uso de Suspense para manejar la carga asíncrona de CardWrapper */}
        {/* Mientras se cargan los datos, se muestra CardsSkeleton */}
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

         {/* Contenedor para el gráfico de ingresos y las últimas facturas */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
         {/* Uso de Suspense para cargar RevenueChart */}
        {/* Muestra RevenueChartSkeleton mientras el gráfico se carga */}
      <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        {/*  Suspense para cargar LatestInvoices que son las ultimas facturas */}
        {/* Muestra LatestInvoicesSkeleton mientras se cargan las últimas facturas */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}