// Este archivo contiene definiciones de tipos para sus datos.
// Describe la forma de los datos y qué tipo de datos debe aceptar cada propiedad.

// Tipo para representar un usuario en el sistema
export type User = {
  id: string; // Identificador único del usuario
  name: string; // Nombre del usuario
  email: string; // Correo electrónico del usuario
  password: string; // Contraseña del usuario (debe manejarse con seguridad)
};

// Tipo para representar un cliente
export type Customer = {
  id: string; // Identificador único del cliente
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  image_url: string; // URL de la imagen del cliente
};

// Tipo para representar una factura
export type Invoice = {
  id: string; // Identificador único de la factura
  customer_id: string; // ID del cliente asociado a la factura
  amount: number; // Monto de la factura
  date: string; // Fecha de emisión de la factura
  status: 'pending' | 'paid'; // Estado de la factura: 'pendiente' o 'pagada'
};

// Tipo para representar los datos de ingresos por mes
export type Revenue = {
  month: string; // Mes al que corresponden los ingresos
  revenue: number; // Monto total de ingresos para ese mes
};

// Tipo para representar las últimas facturas mostradas en la interfaz
export type LatestInvoice = {
  id: string; // Identificador único de la factura
  name: string; // Nombre del cliente
  image_url: string; // URL de la imagen del cliente
  email: string; // Correo electrónico del cliente
  amount: string; // Monto de la factura, formateado como texto
};

// Tipo derivado de LatestInvoice, donde el monto es numérico
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number; // Monto de la factura en formato numérico
};

// Tipo para representar los datos de una tabla de facturas
export type InvoicesTable = {
  id: string; // Identificador único de la factura
  customer_id: string; // ID del cliente asociado a la factura
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  image_url: string; // URL de la imagen del cliente
  date: string; // Fecha de emisión de la factura
  amount: number; // Monto de la factura
  status: 'pending' | 'paid'; // Estado de la factura
};

// Tipo para representar los datos de una tabla de clientes
export type CustomersTableType = {
  id: string; // Identificador único del cliente
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  image_url: string; // URL de la imagen del cliente
  total_invoices: number; // Número total de facturas asociadas al cliente
  total_pending: number; // Monto total de facturas pendientes
  total_paid: number; // Monto total de facturas pagadas
};

// Tipo para representar una tabla de clientes con montos formateados
export type FormattedCustomersTable = {
  id: string; // Identificador único del cliente
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  image_url: string; // URL de la imagen del cliente
  total_invoices: number; // Número total de facturas asociadas al cliente
  total_pending: string; // Monto total de facturas pendientes, formateado como texto
  total_paid: string; // Monto total de facturas pagadas, formateado como texto
};

// Tipo para representar campos básicos de un cliente
export type CustomerField = {
  id: string; // Identificador único del cliente
  name: string; // Nombre del cliente
};

// Tipo para representar el formulario de una factura
export type InvoiceForm = {
  id: string; // Identificador único de la factura
  customer_id: string; // ID del cliente asociado a la factura
  amount: number; // Monto de la factura
  status: 'pending' | 'paid'; // Estado de la factura
};
