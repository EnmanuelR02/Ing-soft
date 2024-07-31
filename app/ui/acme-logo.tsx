import { GlobeAltIcon } from '@heroicons/react/24/outline'; // Importa un icono de globo terráqueo de la biblioteca Heroicons
import { lusitana } from '@/app/ui/fonts'; // Importa una fuente personalizada llamada Lusitana

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> {/* Ícono de globo con rotación */}
      <p className="text-[44px]">R&L facturaciones</p> {/* Texto del logotipo */}
    </div>
  );
}
