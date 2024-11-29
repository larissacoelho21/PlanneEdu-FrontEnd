import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import "../PopUpClass/PopUp.css"

interface PopupProps {
  title: string;
  viewLink: string;
  viewText: string;
  addLink: string;
  addText: string;
  onClose: () => void;
}

export function Popup({
  title,
  viewLink,
  viewText,
  addLink,
  addText,
  onClose,
}: PopupProps) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup-planne" onClick={(e) => e.stopPropagation()}>
        <div className="popup-content">
          <h1>{title}</h1>
        </div>
        <div className="buttons-action">
          <div className="button-view">
            <Link to={viewLink}>
              <Eye size={20} />
              <h1>{viewText}</h1>
            </Link>
          </div>
          <div className="button-add">
            <Link to={addLink}>
              <FontAwesomeIcon icon={faPlus} />
              <h1>{addText}</h1>
            </Link>
          </div>
          </div>
          <div className="close-popup">
            <button onClick={onClose}>Fechar</button>
          </div>
        
      </div>
    </div>
  );
}
