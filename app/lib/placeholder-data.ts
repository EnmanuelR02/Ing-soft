// Datos de usuarios en el sistema
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a', // Identificador único del usuario
    name: 'User', // Nombre del usuario
    email: '01enmanuelromero@gmail.com', // Correo electrónico del usuario
    password: '123456', // Contraseña del usuario (debe manejarse con seguridad)
  },
];

// Datos de los clientes
const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa', // Identificador único del cliente
    name: 'Limberth', // Nombre del cliente
    email: 'evil@rabbit.com', // Correo electrónico del cliente
    image_url: '/customers/evil-rabbit.png', // URL de la imagen del cliente
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Wanda',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Esteban',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Stiven',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Bianny',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Angel',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
  {
    id: '10F20235-C59E-4137-O911-Q8C2KY8F7CBB',
    name: 'Felix',
    email: 'gato@gmail.com',
    image_url: '/customers/balazs-orban.png',
  },
];

// Datos de las facturas
const invoices  = [
  {
    customer_id: customers[0].id, // ID del cliente asociado a la factura
    amount: 15795, // Monto de la factura
    status: 'pending', // Estado de la factura ('pending' o 'paid')
    date: '2024-12-06', // Fecha de emisión de la factura
  },
  {
    customer_id:  customers[1].id,
    amount:  20348,
    status:  'pending',
    date:  '2024-11-14',
  },
  {
    customer_id:  customers[4].id,
    amount: 3040.,
    status: 'paid',
    date: '2024-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2024-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2024-01-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2024-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2024-06-05',
  },
];

// Datos de ingresos mensuales
const revenue = [
  { month: 'Jan', revenue: 2000 }, // Ingresos en enero
  { month: 'Feb', revenue: 1800 }, // Ingresos en febrero
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, customers, invoices, revenue };
