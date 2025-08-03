import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { Loader } from "react-feather";

// Import an icon for the spinner (or create your own)

interface CommonButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    loading?: boolean;
    variant?: "secondary" | "destructive" | "outline" | "ghost" | "link";
    size?: "sm" | "lg" | "default" | "icon" | null | undefined;
    type?: "button" | "submit" | "reset" | undefined;
}

const CommonButton: FC<CommonButtonProps> = ({
    children,
    className,
    disabled,
    loading,
    variant,
    size,
    type,
    ...props
}) => {
    return (
        <Button
            className={cn(
                "px-2 h-7 rounded-md",
                className,
                loading && "opacity-80 cursor-not-allowed",
            )}
            {...props}
            disabled={disabled || loading}
            variant={variant}
            size={size}
            type={type}
        >
            {loading ? (
                <Loader
                    color="white"
                    className="animate-spin w-5 h-5 mx-3.5 "
                />
            ) : (
                children
            )}
        </Button>
    );
};

export default CommonButton;
