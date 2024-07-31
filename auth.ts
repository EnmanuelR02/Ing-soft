import NextAuth from 'next-auth'; 
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config'; 
import { z } from 'zod'; 
import { sql } from '@vercel/postgres'; 
import type { User } from '@/app/lib/definitions'; 
import bcrypt from 'bcrypt'; 

// Función para obtener un usuario de la base de datos por su email
async function getUser(email: string): Promise<User | undefined> {
  try {
    // Consulta SQL para obtener el usuario con el email dado
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0]; // Retorna el primer usuario encontrado
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.'); // Lanza un error si falla la consulta
  }
}

// Configuración de NextAuth
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, // Extiende la configuración personalizada de autenticación
  providers: [
    Credentials({
      async authorize(credentials) {
        // Valida las credenciales utilizando zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

        // Si la validación es exitosa, procede a buscar al usuario
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email); // Obtiene el usuario por email
          if (!user) return null; // Si no se encuentra el usuario, retorna null

          // Compara la contraseña proporcionada con la almacenada en la base de datos
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user; // Si las contraseñas coinciden, retorna el usuario
        }
        console.log('Credenciales inválidas'); // Mensaje de error para credenciales inválidas

        return null; // Retorna null si las credenciales son inválidas
      },
    }),
  ],
});
