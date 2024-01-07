import VanillaContainer from "@/components/VannilaRoot";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home: React.FC = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace('/');
    }, []);

    return (
        <div>
            <VanillaContainer />
        </div>
    )
}