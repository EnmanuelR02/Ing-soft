'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


// Definición del esquema de validación para la factura usando Zod
// Valida los campos necesarios para crear o actualizar una factura
const FormSchema = z.object({
  id: z.string(),// Identificador único de la factura (para actualizaciones)
  customerId: z.string({
    invalid_type_error: 'Por favor, seleccione un cliente.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Ingrese un monto mayor a $0.' }),// Monto de la factura en número, debe ser mayor a 0
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Por favor, seleccione el estado de la factura.', //Aqui el estado de la factura, que puede ser pago o pendiente
  }),
  date: z.string(),// Fecha de la factura (no requerida para creación o actualización)
});
 
// Esquema de validación para la creación de una nueva factura 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// Tipo para representar el estado de posibles errores y mensajes de éxito en cada campoo
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null; // Mensaje de éxito o error
};

// Función para crear una nueva factura
export async function createInvoice(prevState: State, formData: FormData) {
  // Validación de los datos del formulario 
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // Retorna errores si la validación falla
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incompletos. Fallo al crear la factura.',
    };
  }
  // Preparar datos para la inserción en la base de datos
  const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100; // Convertir monto a centavos
    const date = new Date().toISOString().split('T')[0]; //fecha actual 
   
  // Insertar los datos en la base de datos
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
    // Retornar mensaje de error si ocurre un problema con la base de datos
      return {
        message: 'Base de datos Error: Fallo al crear la factura.',
      };
    }
   
  // Revalidar caché y redirigir al usuario a la página de facturas
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    
}

// Esquema de validación para la actualización de una factura
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Función para actualizar una factura existente
export async function updateInvoice(
  id: string, // Identificador de la factura a actualizar
  prevState: State, // Estado previo con posibles errores
  formData: FormData, // Datos del formulario para actualizar la factura
) {
    // Validación de los datos del formulario contra el esquema
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
   // Retorna errores si la validación falla
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos incompletos. Error al actualizar factura.',
    };
  }
   // Preparar datos para la actualización en la base de datos
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
    // Actualizar los datos en la base de datos
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Base de datos Error: Actualizacion de factura fallida.' };
  }
   // Revalidar caché y redirigir al usuario a la página de facturas
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
// Función para eliminar una factura
export async function deleteInvoice(id: string) {
  
try {
      // Eliminar la factura de la base de datos
  await sql`DELETE FROM invoices WHERE id = ${id}`;
      // Revalidar caché y retornar mensaje de éxito
  revalidatePath('/dashboard/invoices');
  return { message: ' Factura eliminada.' };
  } catch (error) {
    return { message: 'Base de datos Error: Eliminacion fallida.' };
  }
}
// Función para autenticar el usuario cuando se vaya a iniciar sesion
export async function authenticate(
  prevState: string | undefined, // Estado previo de la autenticación
  formData: FormData, // Datos del formulario de inicio de sesión
) {
  try {
        // Intentar iniciar sesión con las credenciales proporcionadas
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
    // Manejar errores específicos de autenticación
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidadas.';
        default:
          return 'Algo salio mal.';
      }
    }
    throw error;
  }
}