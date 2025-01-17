  import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
  import { fetchCardData } from '@/app/lib/data';


  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
  };

// Componente principal que renderiza las tarjetas
  export default async function CardWrapper() {
    const {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    } = await fetchCardData();  // Obtiene los datos de las tarjetas
    return (
      <>

        <Card title="Pagado" value={totalPaidInvoices} type="collected" />
        <Card title="Pendiente" value={totalPendingInvoices} type="pending" />
        <Card title="Total facturas" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total clientes"
          value={numberOfCustomers}
          type="customers"
        /> 
      </>
    );
  }
// Componente que representa una tarjeta individual
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
  }) {
    const Icon = iconMap[type]; // Selecciona el ícono 

    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null} {/* Muestra el ícono */}
          <h3 className="ml-2 text-sm font-medium">{title}</h3> {/* Muestra el título */}
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value} {/* Muestra el valor */}
        </p>
      </div>
    );
  }
