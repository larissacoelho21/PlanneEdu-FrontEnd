import "./LargeButton.css";

interface Buttons {
    text: string;
}

export function LargeButton ( { text }: Buttons ) {
    return (
        <div className="button-save">
            <button>
               {text}
            </button>
        </div>
    )
}