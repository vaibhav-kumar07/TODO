"use client";

import { Toaster, toast } from "sonner";

export const successToast = (message: string) => {
    toast.success(message, {
        style: {
            backgroundColor: "#4CAF50", // Green
            color: "white",
        },
    });
};

export const errorToast = (message: string) => {
    toast.error(message, {
        style: {
            backgroundColor: "#F44336", // Red
            color: "white",
        },
    });
};

export function ToastProvider() {
    return <Toaster position="top-right" richColors />;
}
