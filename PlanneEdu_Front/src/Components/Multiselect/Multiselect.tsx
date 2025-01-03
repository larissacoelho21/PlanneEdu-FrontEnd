/* importações de hooks, css e icons */
import { useEffect, useRef, useState } from "react";
import styles from "./Multiselect.module.css";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";

/* definindo a estrutura dos objetos, todos terão uma label (texto exibido) e um value (valor associado) */
export type SelectOption = {
  label: string;
  value: string | number;
};

/* utilizado para definir as propriedades que o componente recebe */
type SelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
  options: SelectOption[];
};

export function Multiselect({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    onChange([]);
  }

  function selectOption(option: SelectOption) {
    if (value.some((selectedOption) => selectedOption.value === option.value)) {
      onChange(value.filter((o) => o.value !== option.value));
    } else {
      onChange([...value, option]);
    }
  }

  function isOptionSelected(option: SelectOption) {
    const isSelected = value.some(
      (selectedOption) => selectedOption.value === option.value
    );
    console.log(`Option "${option.label}" selected:`, isSelected);
    return isSelected;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case "Space":
        case "Enter":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
        default:
          break;
      }
    };

    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {value.map((v, index) => (
          <button
            key={`${v.value}-${index}`} // Adiciona índice para unicidade
            onClick={(e) => {
              e.stopPropagation();
              selectOption(v);
            }}
            className={styles["option-badge"]}
          >
            {v.label ? v.label : v.value}{" "}
            <span className={styles["remove-btn"]}>
              <X />
            </span>
          </button>
        ))}
      </span>

      <div className={`${styles.caret} ${isOpen ? styles.open : ""}`}>
        <ChevronDown className="icon-down" />
      </div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={`${option.value}-${index}`} // Ajuda a garantir unicidade
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
