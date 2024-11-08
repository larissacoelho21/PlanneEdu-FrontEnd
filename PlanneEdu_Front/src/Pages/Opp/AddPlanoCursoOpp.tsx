import "../../Css/Opp/AddPlanoCurso.css";
import { useState } from "react";
import { AddMateria } from "../../Components/PlanoDeCurso/AddMateria";
import { Competencias } from "../../Components/PlanoDeCurso/Competencias";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { Check, Plus } from "lucide-react";
import { PopUp } from "../../Components/PopUp/PopUp-v2";
import { toast } from "sonner";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";

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

  /* definindo as opções que serão usadas no multiselect */
  const options: SelectOption[] = [
    {
      label:
        "1. Identificar as características de programação backend em ambiente web",
      value: 1,
    },
    {
      label:
        "1.1 Preparar ambiente necessário ao desenvolvimento back-end para plataforma web",
      value: 2,
    },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Fifth", value: 5 },
  ];

  /* ======== declaração de estados ======== */
  const [showPopUpGrade, setShowPopUpGrade] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const togglePopUpGrade = () => {
    setShowPopUpGrade(!showPopUpGrade);
  };

  /* estado para armazenar disciplinas separadas por semestre */
  const [semesterData, setSemesterData] = useState<{ [key: number]: string[] }>(
    {
      1: [],
      2: [],
      3: [],
      4: [],
    }
  );

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
                <h3>1° semestre</h3>
                <div className="add-btn">
                  <button
                    onClick={(event) => {
                      togglePopUpGrade();
                      event.preventDefault();
                    }}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              <div className="semestre">
                <h3>2° semestre</h3>
                <div className="add-btn">
                  <button
                    onClick={(event) => {
                      togglePopUpGrade();
                      event.preventDefault();
                    }}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              <div className="semestre">
                <h3>3° semestre</h3>
                <div className="add-btn">
                  <button
                    onClick={(event) => {
                      togglePopUpGrade();
                      event.preventDefault();
                    }}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              <div className="semestre">
                <h3>4° semestre</h3>
                <div className="add-btn">
                  <button
                    onClick={(event) => {
                      togglePopUpGrade();
                      event.preventDefault();
                    }}
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>

            {showPopUpGrade && (
              <PopUp
                title="Criar Disciplina"
                subtitle="Defina a disciplina e selecione as competências e habilidades que deseja desenvolver ao longo do curso."
                onClose={() => setShowPopUpGrade(false)}
              >
                <div className="pop-body">
                  <div className="input-field">
                    <InputField
                      id="uc"
                      label="Unidade Curricular"
                      type="text"
                    />
                  </div>
                  <div className="input-field">
                    <InputField id="obj" label="Objetivo" type="text" />
                  </div>
                  <div className="input-field">
                    <InputField
                      id="carga-h"
                      label="Carga Horária"
                      type="number"
                    />
                  </div>
                  <div className="input-field">
                    <InputField id="semestre" label="Semestre" type="number" />
                  </div>
                  <h3>Competências Específicas e Socioemocionais</h3>
                  {/* <div className="multiselects">
                    <label>Conhecimentos</label>
                    <Multiselect
                      options={options}
                      value={[]}
                      onChange={}
                      multiple
                    />

                    <label>Estratégias</label>
                    <Multiselect
                      options={options}
                      value={[]}
                      onChange={}
                      multiple
                    />

                    <label>Recursos</label>
                    <Multiselect
                      options={options}
                      value={[]}
                      onChange={}
                      multiple
                    />
                  </div> */}
                  <h3>Conhecimentos</h3>
                  <div className="input-field">
                    <InputField id="topic" label="Tópico" type="text" />
                  </div>
                  <div className="subtopic">
                    <InputField id="subtopic" label="Subtópico" type="text" />
                    <button className="add-subbtn">
                      <Plus />
                    </button>
                  </div>
                  <div className="detail">
                    <InputField id="detail" label="Detalhe" type="text" />
                    <div className="select-det">
                      <label>Atribuído a:</label>
                      <select name="" id="">
                      <option value="" disabled selected></option>
                      <option value="subtópico 1">SUBTÓPICO 1</option>
                      <option value="subtópico 2">SUBTÓPICO 2</option>
                      <option value="subtópico 3">SUBTÓPICO 1</option>
                      <option value="subtópico 4">SUBTÓPICO 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-field">
                    <InputField id="ambiente" label="Ambiente Pedagógico" type="text"></InputField>
                  </div>
                  <div className="conhecimento-btn">
                    <button>Adicionar Conhecimento</button>
                  </div>
                  
                </div>
              </PopUp>
            )}
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
