import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const labelVariants = cva(" text-foreground ", {
    variants: {
        variant: {
            default: "font-normal ",
            semibold: "font-semibold",
            bold: "font-bold",
            extrabold: "font-extrabold",
            light: "font-light",
            extralight: "font-extralight",
            link: "hover:underline underline-offset-4  cursor-pointer",
        },
        size: {
            default: "text-base ",
            xs: "text-xs",
            sm: "text-sm",
            lg: "text-xl",
            xl: "text-2xl",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface LabelProps
    extends React.LabelHTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof labelVariants> {
    asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "label";
        return (
            <Comp
                className={cn("", labelVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Label.displayName = "Label";

export { Label, labelVariants };
