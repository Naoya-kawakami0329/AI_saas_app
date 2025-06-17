import { toast as sonnerToast } from "sonner";

type ToastProps = {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
};

export const toast = ({ title = "通知", description, variant = "default" }: ToastProps) => {
    if (variant === "destructive") {
        return sonnerToast.error(title, {
            description,
        });
    }

    return sonnerToast(title, {
        description,
    });
}; 