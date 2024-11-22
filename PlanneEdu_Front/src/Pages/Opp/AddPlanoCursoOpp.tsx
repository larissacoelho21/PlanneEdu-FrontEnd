import "../../Css/Opp/AddPlanoCurso.css";
import { useEffect, useRef, useState } from "react";
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
  /* configurações dos inputs de texto/número e selects */
  const InputField = ({
    id,
    label,
    type = "text",
    value,
    options = [],
    onChange,
  }: {
    id: string;
    label: string;
    type?: "text" | "number" | "select";
    value?: string;
    options?: { value: string; label: string }[];
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
  }) => {
    const [isFilled, setIsFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Usando useRef para manter a referência do input
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
  
    /* verificando se o campo tem valor sempre que o valor do campo mudar */
    useEffect(() => {
      if (value && value !== "") {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
    }, [value]);
  
    /* lidando com o evento de mudança para garantir que a label suba */
    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const newValue = event.target.value;
      /* se não estiver vazio, mantém a label no topo */
      setIsFilled(newValue !== "");
      if (onChange) onChange(event);
    };
  
    const handleFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus(); // Garantir que o foco não seja perdido
      }
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      if (value === "") {
        setIsFilled(false);
      }
      setIsFocused(false);
    };
  
    return (
      <fieldset className={`Fieldset ${isFilled || isFocused ? "filled" : ""}`}>
        <label className="label-course" htmlFor={id}>
          {label}
        </label>
        {type === "select" ? (
          <select
            id={id}
            className="input-course"
            value={value || ""}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <option value="" disabled></option>
            {options?.map((option, index) => (
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
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            ref={inputRef}
          />
        )}
      </fieldset>
    );
  };  

  /* funções e configurações das funcionalidades */
  /* configurações referentes ao "CRUD" de conhecimentos */
  type SubtopicData = {
    name: string;
    details: string[];
  };

  type KnowledgeData = {
    topic: string;
    detail: string;
    ambiente: string;
    subtopics: SubtopicData[];
  };

  const [topicInput, setTopicInput] = useState("");
  const [detailAtribuidoInput, setDetailAtribuidoInput] = useState("");
  const [ambienteInput, setAmbienteInput] = useState("");
  const [subtopicInput, setSubtopicInput] = useState("");
  const [detailInput, setDetailInput] = useState("");
  const [subtopics, setSubtopics] = useState<SubtopicData[]>([]);
  const [knowledgeTableData, setKnowledgeTableData] = useState<KnowledgeData[]>(
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const resetKnowledgeInputs = () => {
    setTopicInput("");
    setDetailInput("");
    setAmbienteInput("");
    setSubtopics([]);
  };

  const addSubtopic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (subtopicInput.trim()) {
      const newSubtopic: SubtopicData = { name: subtopicInput, details: [] };
      setSubtopics((prevSubtopics) => [...prevSubtopics, newSubtopic]);
      setSubtopicInput("");
    }
  };

  const deleteSubtopic = (subtopicName: string) => {
    setSubtopics((prevSubtopics) =>
      prevSubtopics.filter((subtopic) => subtopic.name !== subtopicName)
    );
  };

  const addDetailToSubtopic = () => {
    setSubtopics((prevSubtopics) =>
      prevSubtopics.map((subtopic) =>
        subtopic.name === detailAtribuidoInput
          ? { ...subtopic, details: [...subtopic.details, detailInput] }
          : subtopic
      )
    );
    setDetailInput("");
    setDetailAtribuidoInput("");
  };

  const addKnowledge = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (topicInput && ambienteInput && subtopics.length > 0) {
      const newData: KnowledgeData = {
        topic: topicInput,
        detail: detailInput,
        ambiente: ambienteInput,
        subtopics: subtopics,
      };
      setKnowledgeTableData([...knowledgeTableData, newData]);
      resetInputs();
    }
  };

  const resetInputs = () => {
    setTopicInput("");
    setDetailInput("");
    setAmbienteInput("");
    setSubtopics([]);
  };

  const deleteKnowledge = (index: number) => {
    const updatedData = knowledgeTableData.filter((_, i) => i !== index);
    setKnowledgeTableData(updatedData);
  };

  /* armazenando dados inputados no input de seleção */
  const [selectedOptDetail, setSelectedOptDetail] = useState("");

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
  if (showPopUpGrade) {
    setShowPopUpGrade(false);
  } else {
    setShowPopUpGrade(true);
  }
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
            <div className="input-fieldd">
              <InputField label="Nome do Curso" type="text" id="nome-course" />
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
                title="Criar Disciplina"
                subtitle="Defina a disciplina e selecione as competências e habilidades que deseja desenvolver ao longo do curso."
                onClose={() => setShowPopUpGrade(false)}
              >
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
                    <InputField
                      id="topic"
                      label="Tópico"
                      type="text"
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                    />
                  </div>
                  <div className="subtopic">
                    <InputField
                      id="subtopic"
                      label="Subtópico"
                      type="text"
                      value={subtopicInput}
                      onChange={(e) => setSubtopicInput(e.target.value)}
                    />
                    <button className="add-subbtn" onClick={addSubtopic}>
                      <Plus />
                    </button>

                    <div className="subtopic-tags">
                      {subtopics.map((subtopic) => (
                        <div key={subtopic.name} className="subtopic-tag">
                          <span>{subtopic.name}</span>
                          <button onClick={() => deleteSubtopic(subtopic.name)}>
                            Deletar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="detail">
                    <div className="input-detail">
                      <InputField
                        id="detail"
                        label="Detalhe"
                        type="text"
                        value={detailInput}
                        onChange={(e) => setDetailInput(e.target.value)}
                      />
                    </div>
                    <div className="select-course">
                      <div className="select-det">
                        <InputField
                          id="select-field"
                          label="Atribuído a:"
                          type="select"
                          options={subtopics.map((subtopic) => ({
                            value: subtopic.name,
                            label: subtopic.name,
                          }))}
                          value={detailAtribuidoInput}
                          onChange={(e) =>
                            setDetailAtribuidoInput(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-fieldd">
                    <InputField
                      id="ambiente"
                      label="Ambiente Pedagógico"
                      type="text"
                      value={ambienteInput}
                      onChange={(e) => setAmbienteInput(e.target.value)}
                    />
                  </div>
                  <div className="conhecimento-btn">
                    <button onClick={addKnowledge}>
                      Adicionar Conhecimento
                    </button>
                  </div>
                  {/* Tabela de Conhecimentos */}
                  <table>
                    <thead>
                      <tr>
                        <th>Tópico</th>
                        <th>Ambiente</th>
                        <th>Subtópicos</th>
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
                            <button onClick={() => deleteKnowledge(index)}>
                              Deletar
                            </button>
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
          </div> 
 */
}
