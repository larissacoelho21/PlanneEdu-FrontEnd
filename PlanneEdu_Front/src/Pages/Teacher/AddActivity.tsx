import { Clock3, Users } from "lucide-react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";
import "../../Css/Teacher/AddActivity.css";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
}

function InputField({ id, label, type = "text" }: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value !== "");
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="label-add" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-add"
        id={id}
        type={type}
        onChange={handleInputChange}
      />
    </fieldset>
  );
}

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

export function AddActivity() {

  const [value, setValue] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);

  return (
    <section className="add-activity">
      <div className="start-add">
        <SubNavbar />
        <div className="box-info-class">
          <h1>Desenvolvimento de Sistemas | SESI 2023</h1>
          <div className="date-badge">
            <span>23/02/2023 — 18/12/2024</span>
          </div>
          <div className="infos-teacher">
            <div className="semester-teacher">
              <Clock3 size={18} />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <Users size={18} />
              <h1>35 alunos</h1>
            </div>
          </div>
          <div className="discipline">
            <h1>Disciplina:</h1>
            <h2>Desenvolvimento mobile</h2>
          </div>
        </div>
      </div>

      <div className="form-addactivity">
        <div className="dates-add">
          <div className="proposed-date">
            <label htmlFor="" className="label-date">
              Data Proposta
            </label>
            <input type="date" />
          </div>
          <div className="delivery-date">
            <label htmlFor="" className="label-date">
              Data de Entrega
            </label>
            <input type="date" />
          </div>
        </div>

        <div className="add-category">
          <div className="title-add">
            <h1>Estratégia de aprendizagem adotada</h1>
          </div>
          <div className="buttons-add">
            <button>Situação Problema</button>
            <button>Estudo de Caso</button>
            <button>Projeto</button>
            <button>Projeto Integrador</button>
            <button>Pesquisa</button>
            <button>Mostrar todos</button>
          </div>
        </div>

        <div className="row">
          <div className="captecbasic">
            <label className="label-captecbasic">Capacidades Técnicas ou Básicas</label>
            <Multiselect
              options={options}
              value={value}
              onChange={(o) => setValue(o)}
              multiple={true}
            />
          </div>
          <div className="capsocio">
            <label className="label-capsocio">Capacidades Socioemocionais</label>
            <Multiselect
              options={options}
              value={value2}
              onChange={(o) => setValue2(o)}
              multiple={true}
            />
          </div>
        </div>

        <div className="contextualization">
          <InputField id="contextualization" label="Contextualização" type="text" />
        </div>

        <div className="results-add">
          <InputField id="contextualization" label="Resultados Esperados" type="text" />
        </div>
      </div>
    </section>
  );
}
