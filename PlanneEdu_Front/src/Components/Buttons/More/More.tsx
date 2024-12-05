import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../More/More.css"

interface ButtonAddProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

export function ButtonAdd ( { onClick, disabled }: ButtonAddProps ) {
    return(
        <div className="button-more-add">
        <button
          onClick={onClick}
          disabled={disabled}
          className={`button-add ${disabled ? "disabled" : ""}`}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    )
}