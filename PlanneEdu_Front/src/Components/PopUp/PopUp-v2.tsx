/* importação de depedências e dos estilos css */
import React, { useEffect, useRef } from "react";
import "./PopUp-v2.css";

interface PopUpProps {
  title: string;
  subtitle: string;
  /* 'children' representa o conteúdo passado entre as tags de abertura e fechamento do componente, ele pode ser qualquer conteúdo renderizável no React (JSX, strings, números, etc.). Já o 'React.ReactNode' é o tipo que abrange todos os tipos renderizáveis */
  children: React.ReactNode; 
  onClose: () => void;
}

export const PopUp: React.FC<PopUpProps> = ({ title, subtitle, children, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-contents" ref={popupRef}>
        <div className="title-pop">
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </div>
        <div className="popup-body">{children}</div>
      </div>
    </div>
  );
};
