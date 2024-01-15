import {BadgeCheck} from "lucide-react";

interface SuccessComponents {
    message?: string;
};

export const SuccessStyling = ({
    message,
}: SuccessComponents) => {
    if (!message) return null;
    return (
        <div className="bg-green/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green">
            <BadgeCheck className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}