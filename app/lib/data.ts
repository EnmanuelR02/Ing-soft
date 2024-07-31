import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

// Esta funcion es para obtener datos de ingresos 
export async function fetchRevenue() {
    // Evitar que los resultados de esta consulta se almacenen en caché
  noStore();

  try {
    //Parte para provar la carga retrazando 
     console.log('Fetching revenue data...');
     await new Promise((resolve) => setTimeout(resolve, 3000));
    
     // Ejecutar consulta para obtener datos de ingresos
    const data = await sql<Revenue>`SELECT * FROM revenue`;

     console.log('Datos obtenidos 3 segundos despues.');

     // Retornar los datos obtenidos
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
// Función para obtener las últimas facturas
export async function fetchLatestInvoices() {
  noStore();
  try {
        // Consulta para obtener las últimas 5 facturas con detalles del cliente
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    // Formatear el monto de cada factura a formato de moneda
    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices; // Retornar las facturas formateadas
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}
// Función para obtener datos del panel de control (contadores y totales)
export async function fetchCardData() {
  noStore(); // Evitar que los resultados de esta consulta se almacenen en caché
  try {
   // Consultas paralelas para contar facturas, clientes y calcular montos pagados y pendientes
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

       // Ejecutar todas las consultas en paralelo
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

   // Procesar los resultados de las consultas
    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    }; // Retornar los datos procesados
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// Número de elementos por página para paginación
const ITEMS_PER_PAGE = 6;

// Función para obtener facturas filtradas y paginadas
export async function fetchFilteredInvoices(
  query: string, // Término de búsqueda
  currentPage: number, // Número de página actual
) {
  noStore(); // Evitar que los resultados de esta consulta se almacenen en caché
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; // Calcular el desplazamiento para la paginación

  try {
    // Consulta para obtener facturas filtradas y paginadas
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows; // Retornar las facturas obtenidas
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// Función para obtener el número total de páginas para la paginación
export async function fetchInvoicesPages(query: string) {
  noStore(); // Evita que los resultados de esta consulta se almacenen en caché
  try {
        // Consulta para contar el total de facturas que cumplen con el criterio de búsqueda
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

      // Calcular el número total de páginas necesarias para la paginación
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages; // Retornar el número total de páginas
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
// Función para obtener una factura específica por su ID
export async function fetchInvoiceById(id: string) {
  noStore(); // Evitar que los resultados de esta consulta se almacenen en caché
  try {
        // Consulta para obtener una factura específica por ID
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
          // Convertir el monto de centavos a pesos
      amount: invoice.amount / 100,
    }));
    console.log(invoice); 
    return invoice[0]; // Retornar la factura obtenida
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// Función para obtener todos los clientes
export async function fetchCustomers() {
  try {
    // Consulta para obtener todos los clientes ordenados por nombre
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows; // Retornar la lista de clientes
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

// Función para obtener clientes filtrados
export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
        // Consulta para obtener clientes filtrados con detalles de facturación
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;
    // Formatear los totales de facturación a formato de moneda
    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers; // Retornar la lista de clientes filtrados
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

// Función para obtener información de un usuario por su correo electrónico
export async function getUser(email: string) {
  try {
    // Consulta para obtener el usuario basado en el correo electrónico
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User; // Retornar la información del usuario
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
