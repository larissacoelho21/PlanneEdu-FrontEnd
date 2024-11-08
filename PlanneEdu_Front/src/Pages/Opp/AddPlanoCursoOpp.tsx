import { useState } from "react";
import { AddMateria } from "../../Components/PlanoDeCurso/AddMateria";
import { Competencias } from "../../Components/PlanoDeCurso/Competencias";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddPlanoCurso.css";
import { Check, Plus } from "lucide-react";

export function AddPlanoCurso() {
  interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value?: string;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  }

  function InputField({
    id,
    label,
    type = "text",
    value,
    onChange,
  }: InputFieldProps) {
    const [isFilled, setIsFilled] = useState(!!value);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsFilled(event.target.value !== "");
      if (onChange) onChange(event);
    };

    return (
      <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
        <label className="label-course" htmlFor={id}>
          {label}
        </label>
        <input
          className="input-course"
          id={id}
          type={type}
          value={value}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </fieldset>
    );
  }

  return (
    <section className="AddPlanCourses">
      <SubNavbar />
      <div className="AddInfo">
        <div className="intro">
          <h1>Crie um plano de curso</h1>
          <h2>Preencha as informações corretamente</h2>
        </div>

        <form className="form-course">
          <div className="inputs-opp">
            <div className="input-field">
              <InputField label="Nome do Curso" type="text" id="nome-course" />
            </div>
            <div className="input-field">
              <InputField label="Categoria" type="text" id="category-course" />
            </div>
            <div className="input-field">
              <InputField label="Objetivo" type="text" id="obj-course" />
            </div>
            <div className="input-field">
              <InputField label="Competências" type="text" id="compt-course" />
            </div>
            <div className="input-row">
              <div className="input-f">
                <InputField
                  label="Carga Horária"
                  type="number"
                  id="cargah-course"
                />
              </div>
              <div className="input-f">
                <InputField
                  label="Quantidade de semestres"
                  type="number"
                  id="semestres-course"
                />
              </div>
            </div>
          </div>

          <div className="grade-curricular">
            <h2>Grade Horária</h2>
            <div className="semestres">
              <div className="semestre">
                <h3>1° Semestre</h3>
                <div className="add-btn">
                  <button><Plus width={40} height={40} strokeWidth={2} /></button>
                </div>
              </div>
              <div className="semestre">
                <h3>2° Semestre</h3>
                <div className="add-btn">
                  <button><Plus width={40} height={40} strokeWidth={2} /></button>
                </div>
              </div>
              <div className="semestre">
                <h3>3° Semestre</h3>
                <div className="add-btn">
                  <button><Plus width={40} height={40} strokeWidth={2} /></button>
                </div>
              </div>
              <div className="semestre">
                <h3>4° Semestre</h3>
                <div className="add-btn">
                  <button><Plus width={40} height={40} strokeWidth={2} /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="actions-btns">
            <div className="save">
              <button formAction="submit"><Check width={25} height={25} strokeWidth={1.5} textAnchor="middle" /> Salvar Informações</button>
            </div>
            <div className="cancel">
              <button>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

{
  /* <div className="grade-horaria">
            <AddMateria />
          </div>

          <div className="ementa">
            <p>Ementa</p>
            <input type="text" placeholder="Unidade curricular" />
            <input type="text" placeholder="Objetivo" />
          </div>

          <div className="competencias">
            <Competencias />
          </div>

          <div className="Conhecimentos">
            <p>Conhecimentos</p>
            <input type="text" placeholder="Tópicos" />
            <button>+</button>
            <input type="text" placeholder="Sub tópico" />
            <button>+</button>
            <input type="text" placeholder="Detalhe" />
            <button>+</button>
            <input type="text" placeholder="Ambiente pedagógico" />
          </div>

          <div className="botao">
            <button>✓ Salvar Informações</button>
          </div> */
}
