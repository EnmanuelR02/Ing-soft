import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      {/* Contenedor principal para centrar el contenido vertical y horizontalmente */}
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* Sección superior con el logo */}
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
             {/* Logotipo de la empresa */}
            <AcmeLogo />
          </div>
        </div>
          {/* Formulario de inicio de sesión */}
        <LoginForm />
      </div>
    </main>
  );
}