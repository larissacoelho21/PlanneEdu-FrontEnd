import React from "react";
import "./LargeButton.css";

interface Buttons {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
}

export function LargeButton ({ 
    text,
    onClick,
    className,
    type,
    disabled
}: Buttons ) {
    return (
        <div className={`button-large ${className}`}>
            <button onClick={onClick} disabled={disabled}>
               {text}
            </button>
        </div>
    )
}