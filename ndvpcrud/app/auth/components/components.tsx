"use client";
import React, { Children } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LoginButtonComponents{
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
};

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LoginButtonComponents) => {
    const router = useRouter();

    const onClick = () => {
        router.push("./auth/login");
    };

    if (mode === "modal") {
        return (
            <span>
                Prijavljen!
            </span>
        )
    }

    return (
        <Button onClick={onClick} className="cursor-pointer bg-blogBgColor text-secondaryColor py-2 px-4 rounded-md uppercase hover:bg-chocolate transition duration-300 ease-in-out">
            {children}
        </Button>
    )
}