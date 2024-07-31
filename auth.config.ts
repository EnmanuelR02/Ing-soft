import type { NextAuthConfig } from 'next-auth'; // Importa el tipo de configuración de NextAuth

export const authConfig = {
  // Configuración personalizada de páginas
  pages: {
    signIn: '/login', // Especifica la URL de la página de inicio de sesión
  },
  // Callbacks para manejar la lógica de autorización
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Verifica si el usuario está autenticado
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // Verifica si la ruta es parte del dashboard

      if (isOnDashboard) {
        if (isLoggedIn) return true; // Permite el acceso si el usuario está autenticado
        return false; // Deniega el acceso si no está autenticado
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); // Redirige al dashboard si el usuario está autenticado
      }

      return true; // Permite el acceso para otras rutas
    },
  },
  providers: [], // Aquí se deben listar los proveedores de autenticación
} satisfies NextAuthConfig; // Asegura que la configuración cumple con el tipo NextAuthConfig
