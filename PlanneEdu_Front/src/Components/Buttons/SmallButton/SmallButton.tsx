import React from "react";
import "./SmallButton.css";

interface SmallButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function SmallButton({
  text,
  onClick,
  className,
  type,
  disabled
}: SmallButtonProps) {
  return (
    <div className={`button-small ${className}`}>
      <button onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
}
