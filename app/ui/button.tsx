import clsx from 'clsx'; // Importa clsx para la concatenación condicional de clases

// Define la interfaz ButtonProps que extiende las propiedades estándar de un botón HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Define que el botón debe tener contenido de tipo React (como texto o íconos)
}

// Define el componente Button
export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest} // Pasa todas las propiedades restantes al elemento botón
      className={clsx(
        'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className, // Combina las clases base con cualquier clase adicional pasada a través de las props
      )}
    >
      {children} {/* Renderiza el contenido dentro del botón */}
    </button>
  );
}
