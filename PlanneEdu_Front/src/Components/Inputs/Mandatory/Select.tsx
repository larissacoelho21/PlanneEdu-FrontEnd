import "../Mandatory/Select.css"

interface SelectProps {
    label: string;
    obs: string;
}

export function SelectMandatory ( { label, obs }: SelectProps ) {
    return (
        <div className="select-planne-course">
        <label htmlFor="" className="label-select">
          {label}
        </label>
        <select name="" id="">
          <option value=""></option>
        </select>
        <h2>
          * Obs: Para continuar você deve selecionar {obs}
        </h2>
      </div>
    )
}