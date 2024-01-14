"use client";

interface CardWrapperComponents {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const Wrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperComponents) => {
    return (
        <div className="w-[400px] shadow-md">
            {children}
        </div>
    )
}