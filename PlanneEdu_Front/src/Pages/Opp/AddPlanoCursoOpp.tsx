/* importações de bibliotecas, dependências e arquivos*/
import "../../Css/Opp/AddPlanoCurso.css";
import React, { useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { PopUp } from "../../Components/PopUp/PopUp-v2";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronUp, Plus, Trash, X } from "lucide-react";

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

/* ======== configurações e funções referentes aos inputs (texto/número/select) ======== */
interface InputFieldProps {
  id: string;
  name?: string;
  label: string;
  type?: string;
  value?: string | number | null;
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
  name,
  label,
  type = "text",
  value = "",
  onChange,
  onWheel,
  maxValue,
  options = [],
}: InputFieldProps) {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let inputValue = event.target.value;

    /* validação para inputs numéricos */
    if (type === "number") {
      let numericValue = inputValue !== "" ? parseFloat(inputValue) : "";

      if (
        maxValue !== undefined &&
        typeof numericValue === "number" &&
        numericValue > maxValue
      ) {
        numericValue = maxValue;
      }

      inputValue = numericValue.toString();
    }

    if (onChange) {
      onChange(event);
    }
    if (type === "number" && onChange) {
      const numericValue = inputValue !== "" ? parseFloat(inputValue) : NaN;

      if (
        !isNaN(numericValue) &&
        (maxValue === undefined || numericValue <= maxValue)
      ) {
        onChange(event);
      }
    } else if (onChange) {
      onChange(event);
    }
  };

  return (
    <fieldset className={`Fieldset ${value ? "filled" : ""}`}>
      <label htmlFor={id} className="label-course">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          /* garantindo a compatibilidade com o tipo esperado */
          value={value ?? ""}
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
          name={name}
          type={type === "number" ? "text" : type}
          inputMode={type === "number" ? "numeric" : undefined}
          pattern={type === "number" ? "[0-9]*" : undefined}
          value={value ?? ""}
          onChange={handleInputChange}
          onInput={(e) => {
            if (type === "number") {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/[^0-9]/g, "");
            }
          }}
          onWheel={onWheel}
          autoComplete="off"
          className="input-course"
          required
        />
      )}
    </fieldset>
  );
}

export function AddPlanoCurso() {
  /* ======== construção das funcionalidades ======== */

  /* tipificação para os subtópicos */
  type SubtopicData = {
    name: string;
    details: string[];
  };

  /* tipificação para os conhecimentos */
  type KnowledgeData = {
    topic: string;
    subtopics: SubtopicData[];
    detail: string;
    ambiente: string;
  };

  /* tipificação para as disciplinas */
  type DisciplineData = {
    curriculum: string;
    objective: string;
    cargaHoraria: number | null;
    conhecimentos: SelectOption[]; //SelectedOption[]
    estrategias: SelectOption[];
    recursos: SelectOption[];
    knowledgeTableData: KnowledgeData[];
  };

  /* tipificação dos valores do formulário */
  type FormValues = {
    nameCourse: string;
    categoryCourse: string;
    objectiveCourse: string;
    skillsCourse: string;
    cargaHoraria: number | null;
    quantSemestres: number | null;
    curriculum: string;
    objectiveCurriculum: string;
    cargaHCurriculum: number | null;
    topicCourse: string;
    subtopicCourse: string;
    detailCourse: string;
    detailAssigned: string;
    ambienteCourse: string;
    selectedOptDetail: string;
  };


  /* declaração de estados */
  /* estado para controle de exibição do popup */
  const [showPopUpGrade, setShowPopUpGrade] = useState(false);
  const togglePopUpGrade = () => setShowPopUpGrade((prev) => !prev);



  /* estado único para diferentes dados */
  const [formValues, setFormValues] = useState<FormValues>({
    nameCourse: "",
    categoryCourse: "",
    objectiveCourse: "",
    skillsCourse: "",
    cargaHoraria: null,
    quantSemestres: null,
    curriculum: "",
    objectiveCurriculum: "",
    cargaHCurriculum: null,
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
  const [conhecimentos, setConhecimentos] = useState<SelectOption[]>([]);
  const [estrategias, setEstrategias] = useState<SelectOption[]>([]);
  const [recursos, setRecursos] = useState<SelectOption[]>([]);

  /* função para atualizar estados de forma dinâmica */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" && !isNaN(+value) ? +value : value,
    }));
  };

  /* função para a adição dos conhecimentos (tópicos, subtópicos, detalhes e ambientes) */
  const addKnowledge = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (
      popupFormValues.topicCourse &&
      popupFormValues.ambienteCourse &&
      subtopics.length > 0
    ) {
      const newData: KnowledgeData = {
        topic: popupFormValues.topicCourse,
        subtopics: subtopics.map((subtopic) => ({
          name: subtopic.name,
          details: subtopic.details,
        })),
        detail: popupFormValues.detailCourse,
        ambiente: popupFormValues.ambienteCourse,
      };

      setKnowledgeTableData((prevData) => [...prevData, newData]);

      /* resetando os dados */
      setPopupFormValues((prev) => ({
        ...prev,
        topicCourse: "",
        subtopicCourse: "",
        detailCourse: "",
        detailAssigned: "",
        ambienteCourse: "",
      }));
      setSubtopics([]);

      toast.success("Conhecimento adicionado com sucesso!");
    } else {
      toast.error("Preencha todos os campos para adicionar conhecimento.");
    }
  };

  /* função usada para deletar conhecimentos */
  const deleteKnowledge = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();

    const updatedData = knowledgeTableData.filter((_, i) => i !== index);
    setKnowledgeTableData(updatedData);
    toast.success("Conhecimento deletado com sucesso!");
  };

  /* função para a adição de subtópicos */
  const addSubtopic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (popupFormValues.subtopicCourse.trim()) {
      const newSubtopic: SubtopicData = {
        name: popupFormValues.subtopicCourse,
        details: [],
      };
      setSubtopics((prevSubtopics) => [...prevSubtopics, newSubtopic]);
      setPopupFormValues((prev) => ({
        ...prev,
        subtopicCourse: "",
      }));
      toast.success("Subtópico adicionado com sucesso!");
    }
  };

  /* função para deletar os subtópicos já adicionados, baseados em seu nome */
  const deleteSubtopic = (subtopicName: string) => {
    setSubtopics((prevSubtopics) =>
      prevSubtopics.filter((subtopic) => subtopic.name !== subtopicName)
    );
    toast.success(`Subtópico "${subtopicName}" deletado com sucesso!`);
  };

  /* função para a adição de detalhes */
  const addDetail = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (popupFormValues.detailCourse.trim() && popupFormValues.detailAssigned) {
      /* atualizando os subtópicos com os novos detalhes */
      setSubtopics((prevSubtopics) =>
        prevSubtopics.map((subtopic) =>
          subtopic.name === popupFormValues.detailAssigned
            ? {
              ...subtopic,
              details: [...subtopic.details, popupFormValues.detailCourse],
            }
            : subtopic
        )
      );

      /* resentando os campos de entrada */
      setPopupFormValues((prev) => ({
        ...prev,
        detailCourse: "",
        detailAssigned: "",
      }));

      toast.success("Detalhe adicionado com sucesso!");
    } else {
      toast.error(
        "Preencha todos os campos antes de adicionar um detalhe. Tente novamente!"
      );
    }
  };

  /* função para deletar detalhes */
  const deleteDetail = (
    event: React.MouseEvent<HTMLButtonElement>,
    subtopicName: string,
    detail: string
  ) => {
    event.preventDefault();

    setSubtopics((prevSubtopics) =>
      prevSubtopics.map((subtopic) =>
        subtopic.name === subtopicName
          ? {
            ...subtopic,
            details: subtopic.details.filter((d) => d !== detail),
          }
          : subtopic
      )
    );

    toast.success(`Detalhe "${detail}" deletado com sucesso!`);
  };

  /* estado para armazenar o dropdown ativo */
  const [dropdownState, setDropdownState] = useState<string | null>(null);

  /* função do toggle do dropdown */
  const toggleDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    subtopicName: string,
    hasDetails: boolean
  ) => {
    event.preventDefault();

    /* se não tiver detalhes, não será possível "descer" */
    if (!hasDetails) {
      toast.error("Este subtópico não possui detalhes.");
      return;
    }

    /* lógica de toggle, se clicar no mesmo card, ele fecha ou abre */
    setDropdownState((prevState) =>
      prevState === subtopicName ? null : subtopicName
    );
  };

  /* estado para armazenar o dropdown ativo */
  const [dropdownStateDiscipline, setDropdownStateDiscipline] = useState<
    number | null
  >(null);

  /* função de dropdown, alterna a exibição */
  const toggleDisciplineDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();

    setDropdownStateDiscipline((prevState) =>
      prevState === index ? null : index
    );
  };

  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  /* estado para armazenar as disciplinas separadas por semestre */
  const [semesterData, setSemesterData] = useState<{
    [key: number]: DisciplineData[];
  }>({
    1: [],
    2: [],
    3: [],
    4: [],
  });

  /* armazena os valores do formulário do popup */
  const [popupFormValues, setPopupFormValues] = useState<FormValues>({
    nameCourse: "",
    categoryCourse: "",
    objectiveCourse: "",
    skillsCourse: "",
    cargaHoraria: null,
    quantSemestres: null,
    curriculum: "",
    objectiveCurriculum: "",
    cargaHCurriculum: null,
    topicCourse: "",
    subtopicCourse: "",
    detailCourse: "",
    detailAssigned: "",
    ambienteCourse: "",
    selectedOptDetail: "",
  });

  /* manipula a mudança de valores no popup */
  const handlePopupInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    setPopupFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" && !isNaN(+value) ? +value : value,
    }));
  };

  /* função para resetar dados */
  const resetPopupStates = () => {
    setPopupFormValues({
      nameCourse: "",
      categoryCourse: "",
      objectiveCourse: "",
      skillsCourse: "",
      cargaHoraria: null,
      quantSemestres: null,
      curriculum: "",
      objectiveCurriculum: "",
      cargaHCurriculum: null,
      topicCourse: "",
      subtopicCourse: "",
      detailCourse: "",
      detailAssigned: "",
      ambienteCourse: "",
      selectedOptDetail: "",
    });
    setConhecimentos([]);
    setEstrategias([]);
    setRecursos([]);
    setKnowledgeTableData([]);
    setEditingDiscipline(null);
  };

  /* função para salvar disciplina, editada ou não */
  const saveDiscipline = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectedSemester !== null && popupFormValues.curriculum.trim() !== "") {
      const newDiscipline = {
        curriculum: popupFormValues.curriculum,
        objective: popupFormValues.objectiveCurriculum,
        cargaHoraria: popupFormValues.cargaHCurriculum,
        conhecimentos: conhecimentos,
        estrategias: estrategias,
        recursos: recursos,
        knowledgeTableData: [...knowledgeTableData],
      };

      setSemesterData((prevState) => {
        if (editingDiscipline) {
          /* atualizando disciplina existente */
          const { semester, index } = editingDiscipline;
          const updatedSemesterData = [...prevState[semester]];
          updatedSemesterData[index] = newDiscipline;

          toast.success(
            `Disciplina "${newDiscipline.curriculum}" atualizada com sucesso!`
          );

          return {
            ...prevState,
            [semester]: updatedSemesterData,
          };
        } else {
          toast.success(
            `Disciplina "${newDiscipline.curriculum}" adicionada com sucesso!`
          );
          return {
            ...prevState,
            [selectedSemester]: [
              ...(prevState[selectedSemester] || []),
              newDiscipline,
            ],
          };
        }
      });

      /* resetando os dados */
      resetPopupStates();
      setShowPopUpGrade(false);
    } else {
      toast.error(
        "Preencha todos os campos para criar uma disciplina. Tente novamente!"
      );
    }
  };

  /* estado para identificar a disciplina em edição */
  const [editingDiscipline, setEditingDiscipline] = useState<{
    semester: number;
    index: number;
    discipline: DisciplineData;
  } | null>(null);

  /* inicia o processo de edição de disciplinas */
  const startEditDiscipline = (
    event: React.MouseEvent<HTMLButtonElement>,
    semester: number,
    index: number
  ) => {
    event.preventDefault();

    const discipline = semesterData[semester]?.[index];

    if (discipline) {
      setEditingDiscipline({ semester, index, discipline });

      setPopupFormValues({
        nameCourse: "",
        categoryCourse: "",
        objectiveCourse: "",
        skillsCourse: "",
        cargaHoraria: discipline.cargaHoraria,
        quantSemestres: null,
        curriculum: discipline.curriculum,
        objectiveCurriculum: discipline.objective,
        cargaHCurriculum: discipline.cargaHoraria,
        topicCourse: "",
        subtopicCourse: "",
        detailCourse: "",
        detailAssigned: "",
        ambienteCourse: "",
        selectedOptDetail: "",
      });

      setConhecimentos(discipline.conhecimentos);
      setEstrategias(discipline.estrategias);
      setRecursos(discipline.recursos);
      setKnowledgeTableData(discipline.knowledgeTableData);

      setShowPopUpGrade(true);
    } else {
      console.error(
        `Disciplina não encontrada para o semestre ${semester} e índice ${index}`
      );
    }
  };

  /* função de remoção de disciplina */
  const deleteDiscipline = (
    event: React.MouseEvent<HTMLButtonElement>,
    semester: number,
    index: number
  ) => {
    event.preventDefault();

    setSemesterData((prevState) => ({
      ...prevState,
      [semester]: prevState[semester].filter((_, i) => i !== index),
    }));

    /* resetando os dados */
    setFormValues({
      nameCourse: "",
      categoryCourse: "",
      objectiveCourse: "",
      skillsCourse: "",
      cargaHoraria: null,
      quantSemestres: null,
      curriculum: "",
      objectiveCurriculum: "",
      cargaHCurriculum: null,
      topicCourse: "",
      subtopicCourse: "",
      detailCourse: "",
      detailAssigned: "",
      ambienteCourse: "",
      selectedOptDetail: "",
    });

    setConhecimentos([]);
    setEstrategias([]);
    setRecursos([]);
    setSubtopics([]);
    setKnowledgeTableData([]);

    toast.success("Disciplina deletada com sucesso!");
  };

  /* função para o botão de cancelar, limpa os dados e para de exibir o popup */
  const closePopUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    togglePopUpGrade();
    resetPopupStates();
  };



  /* Função de envio de dados ao back-end */
  const BackPlanCourse = async () => {
    // Estrutura de dados final a ser enviada
    const dataToSend = {
      materias: Object.values(semesterData).flat().map((discipline) => ({
        nome: discipline.curriculum,
        cargaHoraria: discipline.cargaHoraria,
        objetivo: discipline.objective,
        capaBasicaOuTecnica: "Básica", // Ajuste conforme necessário
        capaSocioemocional: "Colaboração", // Ajuste conforme necessário
        conhecimento: discipline.conhecimentos.map((c) => c.value), // Supondo que SelectOption contém { value, label }
        ambiente: discipline.knowledgeTableData.map((k) => k.ambiente).join(", "),
        semCorrespondente: [1, 2], // Ajuste conforme necessário
      })),
      nome: formValues.nameCourse,
      categoria: formValues.categoryCourse,
      objetivo: formValues.objectiveCourse,
      requisitosAcesso: "Ensino Fundamental completo", // Ajuste conforme necessário
      competenciasProfissionais: formValues.skillsCourse.split(","), // Exemplo de separação por vírgulas
      cargaHoraria: formValues.cargaHoraria,
      qtdSemestre: formValues.quantSemestres,
      tempoCurso: "2 anos", // Ajuste conforme necessário
      semestre: Object.entries(semesterData).map(([key, disciplines]) => ({
        numero: Number(key),
        unidadeCurricular: disciplines.map((d) => ({
          nome: d.curriculum,
          cargaHoraria: d.cargaHoraria,
        })),
      })),
    };

    try {
      const response = await BackPlanCourse();
      toast.success("Plano de curso enviado com sucesso!");
      console.log("Resposta da API:", response);// Para validação de retorno
    } catch (error) {
      toast.error("Erro ao enviar o plano de ensino. Tente novamente!");
      console.error(error);
    }
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
              <InputField
                label="Nome do Curso"
                name="nameCourse"
                type="text"
                id="name-course"
                value={formValues.nameCourse}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Categoria"
                name="categoryCourse"
                type="text"
                id="category-course"
                value={formValues.categoryCourse}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Objetivo"
                name="objectiveCourse"
                type="text"
                id="obj-course"
                value={formValues.objectiveCourse}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Competências"
                name="skillsCourse"
                type="text"
                id="compt-course"
                value={formValues.skillsCourse}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-row">
              <div className="input-fieldd">
                <InputField
                  label="Carga Horária"
                  name="cargaHoraria"
                  type="number"
                  id="cargah-course"
                  value={formValues.cargaHoraria}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-fieldd">
                <InputField
                  label="Quantidade de semestres"
                  name="quantSemestres"
                  type="number"
                  id="semestres-course"
                  value={formValues.quantSemestres}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="grade-curricular">
            <h2>Grade Horária</h2>
            <div className="semestres">
              {[1, 2, 3, 4].map((semester) => (
                <div key={semester} className="semestre">
                  <h3>{semester}° semestre</h3>
                  <div className="add-btn">
                    <button
                      onClick={(event) => {
                        setSelectedSemester(semester);
                        resetPopupStates();
                        togglePopUpGrade();
                        event.preventDefault();
                      }}
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="discipline-cards">
                    {semesterData[semester]?.map((discipline, index) => (
                      <div key={index} className="discipline-card">
                        {/* Informações básicas */}
                        <div className="card-header">
                          <div className="card-intro">
                            <h4>{discipline.curriculum}</h4>
                            <button
                              onClick={(event) =>
                                toggleDisciplineDropdown(event, index)
                              }
                              className="dropdown-toggle-btn"
                            >
                              {dropdownStateDiscipline === index ? (
                                <ChevronUp />
                              ) : (
                                <ChevronDown />
                              )}
                            </button>
                          </div>
                          <p className="tag-cargah">
                            Carga Horária: {discipline.cargaHoraria}
                          </p>
                          <p>
                            <strong>Objetivo:</strong> {discipline.objective}
                          </p>
                        </div>

                        {/* detalhes expandíveis no dropdown */}
                        {dropdownStateDiscipline === index && (
                          <div className="card-details">
                            <p>
                              <strong>Conhecimentos:</strong>{" "}
                              {discipline.conhecimentos
                                .map((conhecimento) => conhecimento.label)
                                .join(", ")}
                            </p>
                            <p>
                              <strong>Estratégias:</strong>{" "}
                              {discipline.estrategias
                                .map((estrategia) => estrategia.label)
                                .join(", ")}
                            </p>
                            <p>
                              <strong>Recursos:</strong>{" "}
                              {discipline.recursos
                                .map((recurso) => recurso.label)
                                .join(", ")}
                            </p>

                            {/* tabela de conhecimentos */}
                            {discipline.knowledgeTableData.length > 0 && (
                              <table className="knowledge-table-card">
                                <thead>
                                  <tr>
                                    <th>Tópico</th>
                                    <th>Ambiente</th>
                                    <th>Subtópicos e Detalhes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {discipline.knowledgeTableData.map(
                                    (knowledge, knowledgeIndex) => (
                                      <tr key={knowledgeIndex}>
                                        <td>{knowledge.topic}</td>
                                        <td>{knowledge.ambiente}</td>
                                        <td>
                                          <ul>
                                            {knowledge.subtopics.map(
                                              (subtopic, subtopicIndex) => (
                                                <li key={subtopicIndex}>
                                                  {subtopic.name}
                                                  <ul>
                                                    {subtopic.details.map(
                                                      (detail, detailIndex) => (
                                                        <li key={detailIndex}>
                                                          {detail}
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            )}
                          </div>
                        )}

                        {/* botões de ação */}
                        <div className="card-action-btns">
                          <button
                            onClick={(event) =>
                              startEditDiscipline(event, semester, index)
                            }
                          >
                            Editar
                          </button>
                          <button
                            onClick={(event) =>
                              deleteDiscipline(event, semester, index)
                            }
                          >
                            Deletar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* popup referente a criação de disciplinas */}
            {showPopUpGrade && (
              <PopUp onClose={() => setShowPopUpGrade(false)}>
                <div className="pop-title">
                  <h2>Criar Disciplina</h2>
                  <h3>
                    Defina a disciplina e selecione as competências e
                    habilidades que deseja desenvolver ao longo do curso.
                  </h3>
                </div>
                <div className="pop-body">
                  <div className="input-fieldd">
                    <InputField
                      id="uc"
                      name="curriculum"
                      label="Unidade Curricular"
                      type="text"
                      value={popupFormValues.curriculum}
                      onChange={handlePopupInputChange}
                    />
                  </div>
                  <div className="input-fieldd">
                    <InputField
                      id="obj"
                      label="Objetivo"
                      name="objectiveCurriculum"
                      type="text"
                      value={popupFormValues.objectiveCurriculum}
                      onChange={handlePopupInputChange}
                    />
                  </div>
                  <div className="input-fieldd">
                    <InputField
                      id="carga-h"
                      name="cargaHCurriculum"
                      label="Carga Horária"
                      type="number"
                      value={popupFormValues.cargaHCurriculum}
                      onChange={handlePopupInputChange}
                    />
                  </div>
                  <h3 className="section-title">
                    Competências Específicas e Socioemocionais
                  </h3>

                  <div className="multiselects">
                    <div className="multi-conhe">
                      {/* <InputField
                        label="Conhecimentos"
                        name="conhecimentos"
                        type="text"
                        id="conhc"
                        value={conhecimentos}
                        onChange={handleInputChange}
                      /> */}
                      {/* <label>Conhecimentos</label> */}
                      {/* <Multiselect
                        options={options}
                        value={conhecimentos}
                        onChange={setConhecimentos}
                        multiple
                      /> */}
                    </div>

                    <div className="multi-estra">
                      <label>Estratégias</label>
                      <Multiselect
                        options={options}
                        value={estrategias}
                        onChange={setEstrategias}
                        multiple
                      />
                    </div>

                    <div className="multi-rec">
                      <label>Recursos</label>
                      <Multiselect
                        options={options}
                        value={recursos}
                        onChange={setRecursos}
                        multiple
                      />
                    </div>
                  </div>
                  <h3 className="section-title">Conhecimentos</h3>
                  <div className="input-fieldd">
                    <InputField
                      id="topic"
                      name="topicCourse"
                      label="Tópico"
                      type="text"
                      value={popupFormValues.topicCourse}
                      onChange={handlePopupInputChange}
                    />
                  </div>
                  <div className="subtopic">
                    <div className="subtopic-input">
                      <InputField
                        id="subtopic"
                        name="subtopicCourse"
                        label="Subtópico"
                        type="text"
                        value={popupFormValues.subtopicCourse}
                        onChange={handlePopupInputChange}
                      />
                      <button className="add-subbtn" onClick={addSubtopic}>
                        <Plus />
                      </button>
                    </div>
                  </div>

                  <div className="detail">
                    <div className="input-detail">
                      <InputField
                        id="detail"
                        name="detailCourse"
                        label="Detalhe"
                        type="text"
                        value={popupFormValues.detailCourse}
                        onChange={handlePopupInputChange}
                      />
                    </div>
                    <div className="select-course">
                      <div className="select-det">
                        <InputField
                          id="select-field"
                          name="detailAssigned"
                          label="Atribuído a:"
                          type="select"
                          options={subtopics.map((subtopic) => ({
                            value: subtopic.name,
                            label: subtopic.name,
                          }))}
                          value={popupFormValues.detailAssigned}
                          onChange={handlePopupInputChange}
                        />
                      </div>
                    </div>
                    <button className="add-detail" onClick={addDetail}>
                      Adicionar detalhes
                    </button>
                  </div>
                  {/* lista de cards referente aos subtópicos e detalhes */}
                  <div className="details-list">
                    {subtopics.map((subtopic) => (
                      <div
                        key={subtopic.name}
                        className={`details-card ${dropdownState === subtopic.name ? "active" : ""
                          }`}
                      >
                        <div className="drop-header">
                          <h4>{subtopic.name}</h4>
                          <button
                            className="drop-btn"
                            onClick={(event) =>
                              toggleDropdown(
                                event,
                                subtopic.name,
                                subtopic.details.length > 0
                              )
                            }
                          >
                            <ChevronDown />
                          </button>
                        </div>
                        {/* só renderizar se o dropdown estiver ativo */}
                        {dropdownState === subtopic.name && (
                          <div className="details-cards">
                            <ul className="details-list">
                              {subtopic.details.map((detail, index) => (
                                <li key={index}>
                                  {detail}{" "}
                                  <button
                                    className="delete-btn-detail"
                                    onClick={(event) =>
                                      deleteDetail(event, subtopic.name, detail)
                                    }
                                  >
                                    <X />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button
                          className="delete-subtbtn"
                          onClick={() => deleteSubtopic(subtopic.name)}
                        >
                          {" "}
                          <Trash />
                          Deletar subtópico
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="input-fieldd">
                    <InputField
                      id="ambiente"
                      name="ambienteCourse"
                      label="Ambiente Pedagógico"
                      type="text"
                      value={popupFormValues.ambienteCourse}
                      onChange={handlePopupInputChange}
                    />
                  </div>
                  <div className="conhecimento-btn">
                    <button onClick={addKnowledge}>
                      Adicionar Conhecimento
                    </button>
                  </div>

                  {/* tabela referente aos conhecimentos */}
                  <table className="knowledge-table">
                    <thead>
                      <tr>
                        <th>Tópico</th>
                        <th>Ambiente</th>
                        <th>Subtópicos e Detalhes</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {knowledgeTableData.map((knowledge, knowledgeIndex) => (
                        <tr key={knowledgeIndex}>
                          {/* exibindo nome do tópico */}
                          <td>{knowledge.topic}</td>
                          <td>{knowledge.ambiente}</td>
                          <td>
                            <ul>
                              {knowledge.subtopics.map(
                                (subtopic, subtopicIndex) => (
                                  <li
                                    key={subtopicIndex}
                                    className="subtopic-item"
                                  >
                                    {subtopic.name}
                                    <ul>
                                      {subtopic.details.map(
                                        (detail, detailIndex) => (
                                          <li
                                            key={detailIndex}
                                            className="detail-item"
                                          >
                                            {detail}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                )
                              )}
                            </ul>
                          </td>
                          <td>
                            <button
                              onClick={(event) =>
                                deleteKnowledge(event, knowledgeIndex)
                              }
                            >
                              Deletar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="actions-btns">
                    <button onClick={saveDiscipline}>
                      {editingDiscipline
                        ? "Salvar Alterações"
                        : "Salvar Informações"}
                    </button>
                    <button onClick={closePopUp}>Cancelar</button>
                  </div>
                </div>
              </PopUp>
            )}
          </div>
          <div className="tasks-btns">
            <button className="save-course" onClick={BackPlanCourse}>
              <Check />
              Salvar Alterações
            </button>
            <button className="cancel-course">Cancelar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
