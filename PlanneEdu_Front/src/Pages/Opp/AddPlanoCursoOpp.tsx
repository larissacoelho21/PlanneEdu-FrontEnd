import { useState } from "react";
import { AddMateria } from "../../Components/PlanoDeCurso/AddMateria";
import { Competencias } from "../../Components/PlanoDeCurso/Competencias";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddPlanoCurso.css"

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
        <label className="label-add" htmlFor={id}>
          {label}
        </label>
        <input
          className="input-add"
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
            <div className="input-f">
              <InputField label="Nome do Curso" type="text" id="nome-course" />
            </div>
            <div className="input-f">
              <InputField label="Categoria" type="text" id="category-course" />
            </div>
            <div className="input-f">
              <InputField label="Objetivo" type="text" id="obj-course" />
            </div>
            <div className="input-f">
              <InputField label="Competências" type="text" id="compt-course" />
            </div>
            <div className="input-row">
              <div className="cargah">
                <InputField
                  label="Carga Horária"
                  type="text"
                  id="cargah-course"
                />
              </div>
              <div className="qtd-semestre">
                <InputField
                  label="Quantidade de semestres"
                  type="number"
                  id="semestres-course"
                />
              </div>
            </div>
          </div>

          <div className="grade-horaria">
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
          </div>
        </form>
      </div>
    </section>
  );
}
