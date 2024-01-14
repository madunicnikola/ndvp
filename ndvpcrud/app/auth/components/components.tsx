"use client";
import React, { Children } from "react";
import { useRouter } from "next/navigation";

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
        <button onClick={onClick} className="cursor-pointer bg-darkIndigo text-secondaryColor py-2 px-4 rounded-md uppercase hover:bg-indigo transition duration-300 ease-in-out">
            {children}
        </button>
    )
}