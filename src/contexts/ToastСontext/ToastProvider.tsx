import {type ReactNode, useState} from "react";
import type {ToastState} from "@t/toast.ts";
import { ToastContext } from "./ToastContext";
import {Toast, ToastContainer} from "react-bootstrap";
import {capitalize} from "@utils/capitalize.ts";
import type {Variant} from "@t/shared.ts";

type ToastProviderProps = {
    children: ReactNode;
}

export const ToastProvider = ({children}: ToastProviderProps) => {
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });

    const showToast = (message: string, type: Variant = 'success') => {
        setToast({ show: true, message, type });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, show: false }));
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}

            <ToastContainer className="position-fixed top-0 end-0 p-3">
                <Toast show={toast.show} onClose={hideToast} delay={3000} autohide bg={toast.type}>
                    <Toast.Header>
                        <strong className="me-auto">{capitalize(toast.type.toString())}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    )
}