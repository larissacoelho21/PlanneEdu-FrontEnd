import React, { useState, useEffect } from "react";
import "../Field/InputField.css"

interface InputFieldProps {
  id: string;
  name?: string;
  label: string;
  type?: string;
  value?: string | number | null;
  options?: { value: string | number; label: string }[];
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
  onBackendChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  maxLength?: number;
  minLength?: number;
  maxValue?: number;
  disabled?: boolean
}

export function InputField({
  id,
  name,
  label,
  type = "text",
  value = "",
  options = [],
  onChange,
  onWheel,
  onBackendChange,
  maxLength,
  minLength,
  maxValue,
  disabled,
}: InputFieldProps) {
  const [localValue, setLocalValue] = useState<string | number | null>(value);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setLocalValue(value);
    setIsFilled(value !== "" && value !== null); 
  }, [value]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let inputValue: string | number = event.target.value;
  
    if (type === "number") {
      let numericValue = inputValue !== "" ? parseFloat(inputValue) : "";
  
      if (
        maxValue !== undefined &&
        typeof numericValue === "number" &&
        numericValue > maxValue
      ) {
        numericValue = maxValue;
      }
  
      inputValue = numericValue;
    }
  
    if (maxLength && typeof inputValue === "string" && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
  
    setLocalValue(inputValue);
    setIsFilled(inputValue !== "" && inputValue !== null); // Atualiza o estado `isFilled`
  
    if (onChange) {
      onChange(event);
    }
  
    if (onBackendChange) {
      onBackendChange(event);
    }
  };  

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="label-all" htmlFor={id}>
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={localValue ?? ""}
          onChange={handleInputChange}
          className="input-all"
        >
          <option value="" disabled></option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={localValue ?? ""}
          onChange={handleInputChange}
          className="textarea input-all"
          disabled={disabled}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={localValue ?? ""}
          onChange={handleInputChange}
          onWheel={onWheel}
          className="input-all"
          disabled={disabled}
        />
      )}
    </fieldset>
  );
}