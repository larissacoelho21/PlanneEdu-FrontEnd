/* importação de depedências e dos estilos css */
import React from "react";
import "./PopUp-v2.css";

interface PopUpProps {
  title: string /* título do popup */;
  subtitle: string;
  children: React.ReactNode /* 'children' representa o conteúdo passado entre as tags de abertura e fechamento do componente, ele pode ser qualquer conteúdo renderizável no React (JSX, strings, números, etc.). Já o 'React.ReactNode' é o tipo que abrange todos os tipos renderizáveis */;
}

export const PopUp: React.FC<PopUpProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-contents">
        <div className="title-pop">
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </div>
        <div className="popup-body">{children}</div>
      </div>
    </div>
  );
};
