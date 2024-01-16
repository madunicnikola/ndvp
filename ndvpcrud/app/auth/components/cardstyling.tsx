"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./headerstyling";

interface CardWrapperComponents {
    children: React.ReactNode;
    headerLabel: string;
};

export const Wrapper = ({
    children,
    headerLabel,
}: CardWrapperComponents) => {
    return (
        <Card className="w-[400px] shadow-md border-secondaryColor bg-mocha">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent className="text-secondaryColor text-lg">
                {children}
            </CardContent>
        </Card>
    )
}