import { Revenue } from './definitions';
// Convierte una cantidad de centavos a formato de moneda en pesos.

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

// Formatea una cadena de fecha a un formato localizado.
export const formatDateToLocal = (
  dateStr: string, // Cadena de fecha en formato ISO
  locale: string = 'en-US', // Configuración regional para el formato de la fecha
) => {
  const date = new Date(dateStr); // Crea un objeto Date a partir de la cadena de fecha
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric', // Día en formato numérico
    month: 'short', // Mes en formato abreviado (e.g., 'Jun')
    year: 'numeric', // Año en formato numérico
  };
  const formatter = new Intl.DateTimeFormat(locale, options); // Crea un formateador de fecha
  return formatter.format(date); // aqyi devuelve la fecha ya formateada
};

export const generateYAxis = (revenue: Revenue[]) => {
 // Genera etiquetas para el eje Y basadas en los ingresos más altos
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue)); // Encuentra el ingreso más alto
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`); // Añade etiquetas en incrementos de 1000
  }

  return { yAxisLabels, topLabel };
};

// Genera números de página para la paginación, incluyendo el uso de '...'
export const generatePagination = (currentPage: number, totalPages: number) => {
    // Si hay 7 o menos páginas, muestra todas sin puntos suspensivos.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

   // Si la página actual está entre las primeras 3, muestra las primeras 3,
  // un punto suspensivo y las últimas 2 páginas.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // Si la página actual está entre las últimas 3, muestra las primeras 2,
  // un punto suspensivo y las últimas 3 páginas.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

 // Si la página actual está en medio, muestra la primera página, un punto suspensivo,
  // la página actual y sus vecinas, otro punto suspensivo y la última página.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
