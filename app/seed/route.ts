import bcrypt from 'bcrypt'; // Importa bcrypt para manejar el hashing de contraseñas
import { db } from '@vercel/postgres'; // Importa la conexión a la base de datos de Vercel Postgres
import { invoices, customers, revenue, users } from '../lib/placeholder-data'; // Importa datos de ejemplo

// Conexión al cliente de la base de datos
const client = await db.connect();

// Función para sembrar (seed) datos de usuarios en la base de datos
async function seedUsers() {
  // Asegura que la extensión uuid-ossp esté habilitada para generar UUIDs
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Crea la tabla de usuarios si no existe
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, // ID único generado automáticamente
      name VARCHAR(255) NOT NULL, // Nombre del usuario
      email TEXT NOT NULL UNIQUE, // Correo electrónico único
      password TEXT NOT NULL // Contraseña del usuario
    );
  `;

  // Inserta usuarios en la base de datos, hash de la contraseña antes de guardar
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Hashea la contraseña
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING; // Evita conflictos de inserción
      `;
    }),
  );

  return insertedUsers; // Devuelve los usuarios insertados
}

// Función para sembrar datos de facturas en la base de datos
async function seedInvoices() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Crea la tabla de facturas si no existe
  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, // ID único de factura
      customer_id UUID NOT NULL, // ID del cliente asociado
      amount INT NOT NULL, // Monto de la factura
      status VARCHAR(255) NOT NULL, // Estado de la factura (pendiente o pagada)
      date DATE NOT NULL // Fecha de la factura
    );
  `;

  // Inserta facturas en la base de datos
  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedInvoices; // Devuelve las facturas insertadas
}

// Función para sembrar datos de clientes en la base de datos
async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Crea la tabla de clientes si no existe
  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, // ID único del cliente
      name VARCHAR(255) NOT NULL, // Nombre del cliente
      email VARCHAR(255) NOT NULL, // Correo electrónico del cliente
      image_url VARCHAR(255) NOT NULL // URL de la imagen del cliente
    );
  `;

  // Inserta clientes en la base de datos
  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers; // Devuelve los clientes insertados
}

// Función para sembrar datos de ingresos en la base de datos
async function seedRevenue() {
  // Crea la tabla de ingresos si no existe
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE, // Mes del ingreso
      revenue INT NOT NULL // Monto de ingresos
    );
  `;

  // Inserta datos de ingresos en la base de datos
  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue; // Devuelve los ingresos insertados
}

// Endpoint de la API para sembrar la base de datos
export async function GET() {
  try {
    // Inicia una transacción para asegurar consistencia
    await client.sql`BEGIN`;

    // Llama a las funciones de seed para cada tabla
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();

    // Confirma la transacción si todo sale bien
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' }); // Respuesta exitosa
  } catch (error) {
    // Retrocede la transacción en caso de error
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 }); // Respuesta con error
  }
}
