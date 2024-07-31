import { Inter, Lusitana } from 'next/font/google'; // Importa los métodos de carga de fuentes desde next/font/google
 
// Configura la fuente Inter, seleccionando el subset 'latin'
export const inter = Inter({ subsets: ['latin'] });
 
// Configura la fuente Lusitana, seleccionando los pesos '400' y '700' y el subset 'latin'
export const lusitana = Lusitana({
  weight: ['400', '700'], // Define los pesos de la fuente que se desean cargar
  subsets: ['latin'], // Define los subsets de caracteres a incluir, en este caso 'latin'
});
