import NextAuth from 'next-auth'; 
import { authConfig } from './auth.config'; 

// Exporta la configuración de NextAuth utilizando la configuración personalizada
export default NextAuth(authConfig).auth;

// Configuración del matcher para especificar las rutas donde se aplicará la autenticación
export const config = {
  // El matcher aplica la autenticación a todas las rutas, excepto aquellas que coinciden con los patrones especificados
  // Excluye rutas que comienzan con /api, /_next/static, /_next/image, y cualquier ruta que termine en .png
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
