import Image from "next/image";
import { LoginButton } from "./components/components";

export default function AdminAuthHome() {
  return (
    <main className="flex flex-col h-full items-center justify-center bg-backgroundColor">
      <div className="flex items-center space-x-1">
        <div>
          <Image
            src="/images/scene2/scene2_2.png"
            width={300}
            height={300}
            alt="Vladimir Prelog"
            priority={true}
          />
        </div>
        <div className="text-5xl font-semibold text-secondaryColor drop-shadow-md font-sans-montserrat">
            Authentication
        </div>
    </div>
        <div className="text-xl font-semibold mb-10 text-center text-warning border-x-4 border-y-4 border-warning font-sans-montserrat uppercase">
            Svoje lične podatke ne dijeli ni sa kim!
        </div>
    <LoginButton>
        Prijavi se
    </LoginButton>
    </main>
  );
}