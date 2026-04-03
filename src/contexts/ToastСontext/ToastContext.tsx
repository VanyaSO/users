import { createContext } from "react";
import type {Variant} from "@t/shared.ts";

type ToastContextType = {
    (message: string, type?: Variant): void
}

export const ToastContext = createContext<ToastContextType | null>(null);