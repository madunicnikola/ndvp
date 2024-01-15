import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeaderComponents {
    label: string;
}
export const Header = ({
    label,
}: HeaderComponents) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center space-x-1">
        <div>
          <Image
            src="/images/scene2/scene2_2.png"
            width={150}
            height={150}
            alt="Vladimir Prelog"
            priority={true}
          />
        </div>
        <div className="text-lg mr-10 font-semibold text-secondaryColor drop-shadow-md font-sans-montserrat">
            Authentication
        </div>
    </div>
    <p className="text-muted-foreground text-lg font-bold text-secondaryColor font-sans-montserrat uppercase">
        {label}
    </p>
</div>
    );
};