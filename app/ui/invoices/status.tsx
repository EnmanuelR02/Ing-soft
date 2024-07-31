import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'; // Importa iconos de Heroicons
import clsx from 'clsx'; // Biblioteca para manejar clases condicionales

// Componente funcional que recibe 'status' como prop
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs', // Clases comunes para el contenedor
        {
          'bg-gray-100 text-gray-500': status === 'pending', // Estilo para estado pendiente
          'bg-green-500 text-white': status === 'paid', // Estilo para estado pagado
        },
      )}
    >
      {/* Condicional para mostrar texto y icono basado en el estado */}
      {status === 'pending' ? (
        <>
          Pendiente
          <ClockIcon className="ml-1 w-4 text-gray-500" /> {/* Icono de reloj para pendiente */}
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Pago
          <CheckIcon className="ml-1 w-4 text-white" /> {/* Icono de check para pagado */}
        </>
      ) : null}
    </span>
  );
}
