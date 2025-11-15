import { createPortal } from "react-dom";
import { type ReactNode } from "react";

interface PlayerProps {
    children: ReactNode;
}

export function Player({ children }: PlayerProps) {
    const playerRoot = document.getElementById("modal-root");

    if (!playerRoot) {

        return null

    }

    return createPortal(
        <div className="modal">{children}</div>,
        playerRoot
    );
}
