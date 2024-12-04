import React from "react";
import "../Add/ToAdd.css";
import { Link } from "react-router-dom";

interface ButtonToAddProps {
    path: string;
    text: string
}

export const ButtonToAdd: React.FC<ButtonToAddProps> = ({
    path,
    text, 
  }) => {
    return (
        <div className="button-to-add">
      <Link to={path}>
        {text}
      </Link>
      </div>
    );
  };