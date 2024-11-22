/* importações de bibliotecas, dependências e arquivos*/
import "../../Css/Opp/AddPlanoCurso.css";
import React, { useEffect, useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { PopUp } from "../../Components/PopUp/PopUp-v2";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

export function AddPlanoCurso() {
  /* ======== configurações e funções referentes aos inputs (texto/número/select) ======== */
  interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value?: string | number;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
    maxLength?: number;
    maxValue?: number;
    options?: { value: string | number; label: string }[];
  }

  /* função do componente `InputField` com as propriedades desestruturadas e valores padrão */
  function InputField({
    id,
    label,
    type = "text",
    value = "",
    onChange,
    onWheel,
    maxValue,
    options = [],
  }: InputFieldProps) {
    const [localValue, setLocalValue] = useState<string | number>(value);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
      setIsFilled(localValue !== "");
    }, [localValue]);

    /* gerenciador de mudanças para input ou select */
    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      let inputValue = event.target.value;
    
      /* para inputs de tipo 'number', lida com as validações */
      if (type === "number") {
        let numericValue = inputValue !== "" ? parseFloat(inputValue) : "";
    
        /* respeita o valor máximo permitido */
        if (
          maxValue !== undefined &&
          typeof numericValue === "number" &&
          numericValue > maxValue
        ) {
          numericValue = maxValue;
        }
        setLocalValue(numericValue);
        inputValue = numericValue.toString();
      } else {
        /* para textos e selects */
        setLocalValue(inputValue);
      }
    
      /* propaga o valor atualizado para o pai */
      if (onChange) {
        event.target.value = inputValue;
        onChange(event);
      }
    };

    return (
      <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
        <label htmlFor={id} className="label-course">
          {label}
        </label>
        {type === "select" ? (
          <select
            id={id}
            value={localValue}
            onChange={handleInputChange}
            className="input-course"
          >
            <option value="" disabled></option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            className="input-course"
            type={type}
            value={localValue}
            onChange={handleInputChange}
            onWheel={type === "number" ? onWheel : undefined}
            autoComplete="off"
          />
        )}
      </fieldset>
    );
  }

  /* ======== construção das funcionalidades ======== */

  /* tipificação */
  type SubtopicData = {
    name: string;
    details: string[];
  };

  type KnowledgeData = {
    topic: string;
    subtopics: SubtopicData[];
    detail: string;
    ambiente: string;
  };

  /* declaração de estados */
  const [showPopUpGrade, setShowPopUpGrade] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const togglePopUpGrade = () => {
    if (showPopUpGrade) {
      setShowPopUpGrade(false);
    } else {
      setShowPopUpGrade(true);
    }
  };

  /* estado para armazenar disciplinas separadas por semestre */
  const [semesterData, setSemesterData] = useState<{ [key: number]: string[] }>(
    { 1: [], 2: [], 3: [], 4: [] }
  );

  type FormValues = {
    nameCourse: string;
    categoryCourse: string;
    objectiveCourse: string;
    skillsCourse: string;
    cargaHoraria: number | null;
    quantSemestres: number | null;
    topicCourse: string;
    subtopicCourse: string;
    detailCourse: string;
    detailAssigned: string;
    ambienteCourse: string;
    selectedOptDetail: string;
  };

  /* estado único para diferentes dados */
  const [formValues, setFormValues] = useState<FormValues>({
    nameCourse: "",
    categoryCourse: "",
    objectiveCourse: "",
    skillsCourse: "",
    cargaHoraria: null,
    quantSemestres: null,
    topicCourse: "",
    subtopicCourse: "",
    detailCourse: "",
    detailAssigned: "",
    ambienteCourse: "",
    selectedOptDetail: "",
  });

  const [subtopics, setSubtopics] = useState<SubtopicData[]>([]);
  const [knowledgeTableData, setKnowledgeTableData] = useState<KnowledgeData[]>(
    []
  );

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

  /* função para atualizar estados de forma dinâmica */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      /* Converte strings para número se o tipo for number */
      [name]: type === "number" ? +value : value,
    }));
  };

  /* função para a adição dos conhecimentos (tópicos, subtópicos, detalhes e ambientes) */
  const addKnowledge = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (
      formValues.topicCourse &&
      formValues.ambienteCourse &&
      subtopics.length > 0
    ) {
      const newData: KnowledgeData = {
        topic: formValues.topicCourse,
        subtopics: subtopics,
        detail: formValues.detailCourse,
        ambiente: formValues.ambienteCourse,
      };
      setKnowledgeTableData([...knowledgeTableData, newData]);
      toast.success("Conhecimento adicionado com sucesso!");
    }
  };

  /* função usada para deletar conhecimentos */
  const deleteKnowledge = (index: number) => {
    const updatedData = knowledgeTableData.filter((_, i) => i !== index);
    setKnowledgeTableData(updatedData);
    toast.success("Conhecimento deletado com sucesso!");
  };

  /* função para a adição de subtópicos */
  const addSubtopic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (formValues.subtopicCourse.trim()) {
      const newSubtopic: SubtopicData = {
        name: formValues.subtopicCourse,
        details: [],
      };
      setSubtopics((prevSubtopics) => [...prevSubtopics, newSubtopic]);
      setFormValues((prev) => ({
        ...prev,
        subtopicCourse: "",
      }));
      toast.success("Subtópico adicionado com sucesso!");
    }
  };

  /* função para deletar os subtópicos já adicionados */
  const deleteSubtopic = (subtopicName: string) => {
    setSubtopics((prevSubtopics) =>
      prevSubtopics.filter((subtopic) => subtopic.name !== subtopicName)
    );
    toast.success("Subtópico deletado com sucesso!");
  };

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
            <div className="input-fieldd">
              <InputField label="Nome do Curso" type="text" id="name-course" />
            </div>
            <div className="input-fieldd">
              <InputField label="Categoria" type="text" id="category-course" />
            </div>
            <div className="input-fieldd">
              <InputField label="Objetivo" type="text" id="obj-course" />
            </div>
            <div className="input-fieldd">
              <InputField label="Competências" type="text" id="compt-course" />
            </div>
            <div className="input-row">
              <div className="input-fieldd">
                <InputField
                  label="Carga Horária"
                  type="number"
                  id="cargah-course"
                />
              </div>
              <div className="input-fieldd">
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
                onClose={() => setShowPopUpGrade(false)}
              >
                <div className="pop-title">
                  <h2>Criar Disciplina</h2>
                  <h3>Defina a disciplina e selecione as competências e habilidades que deseja desenvolver ao longo do curso.</h3>
                </div>
                <div className="pop-body">
                  <div className="input-fieldd">
                    <InputField
                      id="uc"
                      label="Unidade Curricular"
                      type="text"
                    />
                  </div>
                  <div className="input-fieldd">
                    <InputField id="obj" label="Objetivo" type="text" />
                  </div>
                  <div className="input-fieldd">
                    <InputField
                      id="carga-h"
                      label="Carga Horária"
                      type="number"
                    />
                  </div>
                  <div className="input-fieldd">
                    <InputField id="semestre" label="Semestre" type="number" />
                  </div>
                  <h3 className="section-title">
                    Competências Específicas e Socioemocionais
                  </h3>
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
                  <h3 className="section-title">Conhecimentos</h3>
                  <div className="input-fieldd">
                    <InputField id="topic" label="Tópico" type="text" value={formValues.subtopicCourse} onChange={handleInputChange} />
                  </div>
                  <div className="subtopic">
                    <InputField id="subtopic" label="Subtópico" type="text" />
                    <button className="add-subbtn" onClick={addSubtopic}>
                      <Plus />
                    </button>

                    <div className="subtopic-tags">
                      {subtopics.map((subtopic) => (
                        <div key={subtopic.name} className="subtopic-tag">
                          <span>{subtopic.name}</span>
                          <button>
                            <X />
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>

                  <div className="detail">
                    <div className="input-detail">
                      <InputField id="detail" label="Detalhe" type="text" />
                    </div>
                    <div className="select-course">
                      <div className="select-det">
                        <InputField
                          id="select-field"
                          label="Atribuído a:"
                          type="select"
                        />
                      </div>
                    </div>
                    <button className="add-detail">Adicionar detalhes</button>
                  </div>
                  <div className="input-fieldd">
                    <InputField
                      id="ambiente"
                      label="Ambiente Pedagógico"
                      type="text"
                    />
                  </div>
                  <div className="conhecimento-btn">
                    <button>Adicionar Conhecimento</button>
                  </div>

                  {/* tabela referente aos conhecimentos */}
                  <table className="knowledge-table">
                    <thead>
                      <tr>
                        <th>Tópico</th>
                        <th>Ambiente</th>
                        <th>Subtópicos</th>
                        <th>Detalhes</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {knowledgeTableData.map((knowledge, index) => (
                        <tr key={index}>
                          <td>{knowledge.topic}</td>
                          <td>{knowledge.ambiente}</td>
                          <td>
                            <ul>
                              {knowledge.subtopics.map((subtopic, i) => (
                                <li key={i}>
                                  {subtopic.name}
                                  <ul>
                                    {subtopic.details.map((detail, j) => (
                                      <li key={j}>{detail}</li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <button>Deletar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PopUp>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
