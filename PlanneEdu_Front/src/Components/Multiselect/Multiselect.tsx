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
  disabled?: boolean;
};

export function Multiselect({
  value,
  onChange,
  options,
  disabled,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // coisas para o disabled funfar

  const toggleDropDown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: SelectOption) => {
    if (disabled) return;

    if (value.some((o) => o.value === option.value)) {
      onChange(value.filter((o) => o.value !== option.value));
    } else {
      onChange([...value, option]);
    }
  };

  const isSelected = (option: SelectOption) =>
    value.some((o) => o.value === option.value);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (disabled || e.target !== containerRef.current) return;

      switch (e.code) {
        case "Space":
        case "Enter":
          setIsOpen((prev) => !prev);
          if (isOpen) handleOptionSelect(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newIndex = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newIndex >= 0 && newIndex < options.length) {
            setHighlightedIndex(newIndex);
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
  }, [isOpen, highlightedIndex, options, disabled]);

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
      tabIndex={disabled ? -1 : 0}
      className={`${styles.container} ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.value}>
        {value.map((v, index) => (
          <button
            /* adiciona índice para unidade */
            key={`${v.value}-${index}`}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(v);
            }}
            className={styles["option-badge"]}
            disabled={disabled}
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
      <ul
        className={`${styles.options} ${isOpen ? styles.show : ""}`}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
      >
        {options.map((option, index) => (
          <li
            /* garante que é único */
            key={`${option.value}-${index}`}
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
