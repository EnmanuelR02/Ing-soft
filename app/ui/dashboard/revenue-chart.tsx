import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  // Componente asincrónico que obtiene datos de ingresos
  const revenue = await fetchRevenue(); // Obtiene los datos de ingresos
  const chartHeight = 350; // Altura del gráfico

  // Genera etiquetas del eje Y y la etiqueta superior basada en los ingresos
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  // Verifica si los datos de ingresos están disponibles
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">Sin data disponible.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Ingresos recientes
      </h2>

      {/* Contenedor principal del gráfico */}
      <div className="rounded-xl bg-gray-50 p-4">
        {/* Grilla para mostrar las barras del gráfico */}
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          
          {/* Columna de etiquetas del eje Y, visible solo en pantallas grandes */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Mapea los datos de ingresos para crear las barras del gráfico */}
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              {/* Muestra el mes correspondiente, con rotación en pantallas pequeñas */}
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        {/* Sección inferior del gráfico con ícono de calendario */}
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Últimos 12 meses</h3>
        </div>
      </div>
    </div>
  );
}
