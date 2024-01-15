"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./headerstyling";
import { Social } from "./socialstyling";

interface CardWrapperComponents {
    children: React.ReactNode;
    headerLabel: string;
    showSocial?: boolean;
};

export const Wrapper = ({
    children,
    headerLabel,
    showSocial,
}: CardWrapperComponents) => {
    return (
        <Card className="w-[400px] shadow-md border-secondaryColor bg-mocha">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent className="text-secondaryColor text-lg">
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
        </Card>
    )
}