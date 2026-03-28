import {useContext} from "react";
import {ToastContext} from "@/contexts/ToastСontext/ToastContext.tsx";

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('ToastContext must be used with ToastProvider');

    return context;
};
