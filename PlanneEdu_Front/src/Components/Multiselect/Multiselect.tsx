import { useEffect, useState } from "react";
import styles from "./Multiselect.module.css"

type SelectOption = {
    label: string
    /* pode receber qualquer tipo de dado */
    value: any
}

type SelectProps = {
    /* lista das opções de seleção */
    options: SelectOption[]
    /* opção selecionada - '?', não é necessário passar um valor */
    value?: SelectOption
    /* habilidade de mudar a seleção, possível não selecionar nada */
    onChange: (value: SelectOption | undefined) => void
}

export function Multiselect({ value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    function clearOptions() {
        onChange(undefined)
    }

    function selectOption(option:SelectOption){
        if(option !== value) onChange(option)
    }

    function isOptionSelected(option : SelectOption){
        return option === value
    }

    useEffect(() => {
        if(isOpen) setHighlightedIndex(0)
    }, [isOpen])

    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.container}
        >
            <span className={styles.value}>{value?.label}</span>
            <button
                className={styles["clear-btn"]}
                onClick={e => {
                    e.stopPropagation()
                    clearOptions()
                }}
            >&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    key={option.value} 
                    className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highlightedIndex ? styles.highlighted : ""}`}
                    >{option.label}</li>
                ))}
            </ul>
        </div>
    )
}