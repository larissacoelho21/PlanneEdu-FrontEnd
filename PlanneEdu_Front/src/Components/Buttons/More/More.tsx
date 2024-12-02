import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../More/More.css"

interface ButtonAddProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ButtonAdd ( { onClick }: ButtonAddProps ) {
    return(
        <div className="button-more-add">
        <button
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    )
}