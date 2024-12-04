/* importações de bibliotecas, dependências e arquivos*/
import "../../Css/Opp/AddPlanoCurso.css";
import React, { useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { PopUp } from "../../Components/PopUp/PopUp-v2";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { backPlanCourse } from "../../Services/Axios";
import { InputField } from "../../Components/Inputs/InputField/Field/InputField";

export function AddPlanoCurso() {
  /* ======== construção das funcionalidades ======== */
  type KnowledgeStructure = {
    topicos: {
      tituloTopico: string;
      subTopicos: {
        tituloSubtopico: string;
        detalhes: string[];
      }[];
    }[];
  };

  /* tipificação para as disciplinas */
  type DisciplineData = {
    curriculum: string;
    objective: string;
    cargaHoraria: number | null;
    capBasTecCourse: string[];
    capSocioCourse: string[];
    knowledgeInput: string;
  };

  /* tipificação dos valores do formulário */
  type FormValues = {
    /* valores do formulário fora do popup */
    nameCourse: string;
    categoryCourse: string;
    objectiveCourse: string;
    reqAcesso: string;
    skillsCourse: string;
    cargaHoraria: number | null;
    quantSemestres: number | null;
    /* valores do formulário do popup */
    curriculum: string;
    objectiveCurriculum: string;
    cargaHCurriculum: number | null;
    capBasTecCourse: string;
    capSocioCourse: string;
    knowledgeInput: string;
    ambienteCourse: string;
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
    reqAcesso: "",
    skillsCourse: "",
    cargaHoraria: null,
    quantSemestres: null,
    curriculum: "",
    objectiveCurriculum: "",
    cargaHCurriculum: null,
    capBasTecCourse: "",
    capSocioCourse: "",
    knowledgeInput: "",
    ambienteCourse: "",
  });

  /* inicializando o estado `selectedOptions` como um array vazio */
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [semesterData, setSemesterData] = useState<{
    [key: number]: DisciplineData[];
  }>({
    1: [],
    2: [],
    3: [],
    4: [],
  });

  /* função para atualizar estados de forma dinâmica */
  const handleFormInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" && !isNaN(+value) ? +value : value,
    }));
  };

  /* ======== funções para inputar os conhecimentos (tópicos, subtópicos e detalhes) ======== */
  const processKnowledgeInput = (inputText: string): KnowledgeStructure => {
    /* dividindo texto por linhas e removendo espaços extras */
    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    /* objeto inicial para armazenar os tópicos */
    const knowledge: KnowledgeStructure = { topicos: [] };

    /* variáveis para controlar o tópico e subtópico atual */
    let currentTopic: { tituloTopico: string; subTopicos: any[] } | null = null;
    let currentSubtopic: {
      tituloSubtopico: string;
      detalhes: string[];
    } | null = null;

    /* percorre cada linha do texto */
    for (const line of lines) {
      /* identificando tópicos */
      if (/^\d+\.\s/.test(line)) {
        if (currentSubtopic) {
          currentTopic?.subTopicos.push(currentSubtopic);
          currentSubtopic = null;
        }
        if (currentTopic) {
          knowledge.topicos.push(currentTopic);
        }
        currentTopic = {
          /* removendo indice */
          tituloTopico: line.replace(/^\d+\.\s*/, ""),
          subTopicos: [],
        };
        /* identificando subtópicos */
      } else if (/^\d+\.\d+\.\s/.test(line)) {
        if (currentSubtopic) {
          currentTopic?.subTopicos.push(currentSubtopic);
        }
        currentSubtopic = {
          tituloSubtopico: line.replace(/^\d+\.\d+\.\s*/, ""),
          detalhes: [],
        };
        /* identificando detalhes */
      } else if (/^\d+\.\d+\.\d+\.\s/.test(line)) {
        currentSubtopic?.detalhes.push(line.replace(/^\d+\.\d+\.\d+\.\s*/, ""));
      }
    }

    /* adiciona o último subtópico e tópico ao final */
    if (currentSubtopic) {
      currentTopic?.subTopicos.push(currentSubtopic);
    }
    if (currentTopic) {
      knowledge.topicos.push(currentTopic);
    }

    return knowledge;
  };

  /* armazena os valores do formulário do popup */
  const [popupFormValues, setPopupFormValues] = useState<FormValues>({
    nameCourse: "",
    categoryCourse: "",
    objectiveCourse: "",
    reqAcesso: "",
    skillsCourse: "",
    cargaHoraria: null,
    quantSemestres: null,
    curriculum: "",
    objectiveCurriculum: "",
    cargaHCurriculum: null,
    capBasTecCourse: "",
    capSocioCourse: "",
    knowledgeInput: "",
    ambienteCourse: "",
  });

  /* função para processar o texto inserido, transformando em uma lista */
  const processCapacitiesToList = (inputText: string): string[] => {
    return inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .map((line) => line.replace(/^\d+\.\s*/, ""));
  };

  /* função que manipula a mudança de valores no formulário */
  const handlePopupInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setPopupFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  /* função para resetar dados */
  const resetPopupStates = () => {
    setPopupFormValues({
      nameCourse: "",
      categoryCourse: "",
      objectiveCourse: "",
      reqAcesso: "",
      skillsCourse: "",
      cargaHoraria: null,
      quantSemestres: null,
      curriculum: "",
      objectiveCurriculum: "",
      cargaHCurriculum: null,
      capBasTecCourse: "",
      capSocioCourse: "",
      knowledgeInput: "",
      ambienteCourse: "",
    });
    setEditingDiscipline(null);
  };

  /* função para salvar disciplina, editada ou não */
  const saveDiscipline = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectedSemester !== null && popupFormValues.curriculum.trim() !== "") {
      const processedCapBasTec = processCapacitiesToList(
        popupFormValues.capBasTecCourse
      );
      const processedCapSocio = processCapacitiesToList(
        popupFormValues.capSocioCourse
      );
      const processedKnowledge = processKnowledgeInput(
        popupFormValues.knowledgeInput
      );

      console.log("Capacidades Básicas/Técnicas:", processedCapBasTec);
      console.log("Capacidades Socioemocionais:", processedCapSocio);

      const newDiscipline = {
        curriculum: popupFormValues.curriculum,
        objective: popupFormValues.objectiveCurriculum,
        cargaHoraria: popupFormValues.cargaHCurriculum,
        capBasTecCourse: processedCapBasTec,
        capSocioCourse: processedCapSocio,
        knowledgeInput: JSON.stringify(processedKnowledge),
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
        reqAcesso: "",
        skillsCourse: "",
        cargaHoraria: discipline.cargaHoraria,
        quantSemestres: null,
        curriculum: discipline.curriculum,
        objectiveCurriculum: discipline.objective,
        cargaHCurriculum: discipline.cargaHoraria,
        /* convertendo os arrays para strings com quebra de linha */
        capBasTecCourse: Array.isArray(discipline.capBasTecCourse)
          ? discipline.capBasTecCourse.join("\n")
          : "",
        capSocioCourse: Array.isArray(discipline.capSocioCourse)
          ? discipline.capSocioCourse.join("\n")
          : "",
        knowledgeInput: "",
        ambienteCourse: "",
      });

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
      reqAcesso: "",
      skillsCourse: "",
      cargaHoraria: null,
      quantSemestres: null,
      curriculum: "",
      objectiveCurriculum: "",
      cargaHCurriculum: null,
      capBasTecCourse: "",
      capSocioCourse: "",
      knowledgeInput: "",
      ambienteCourse: "",
    });

    toast.success("Disciplina deletada com sucesso!");
  };

  /* função para o botão de cancelar, limpa os dados e para de exibir o popup */
  const closePopUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    togglePopUpGrade();
    resetPopupStates();
  };

  /* ======== configurações e funções relacionadas com o backend ======== */
  const mapFormToBackend = (formData: FormValues) => {
    return {
      nome: formData.nameCourse,
      categoria: formData.categoryCourse,
      objetivo: formData.objectiveCourse,
      requisitosAcesso: formData.reqAcesso,
      competenciasProfissionais: formData.skillsCourse,
      cargaHoraria: formData.cargaHoraria,
      qtdSemestre: formData.quantSemestres,
      tempoCurso: `${formData.quantSemestres} semestres`
    };
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
                onChange={handleFormInputChange}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Categoria"
                name="categoryCourse"
                type="text"
                id="category-course"
                value={formValues.categoryCourse}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Objetivo"
                name="objectiveCourse"
                type="textarea"
                id="obj-course"
                value={formValues.objectiveCourse}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Requisitos de Acesso"
                name="reqAcesso"
                type="textarea"
                id="req-acesso"
                value={formValues.objectiveCourse}
                onChange={handleFormInputChange}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Competências"
                name="skillsCourse"
                type="text"
                id="compt-course"
                value={formValues.skillsCourse}
                onChange={handleFormInputChange}
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
                  onChange={handleFormInputChange}
                />
              </div>
              <div className="input-fieldd">
                <InputField
                  label="Quantidade de semestres"
                  name="quantSemestres"
                  type="number"
                  id="semestres-course"
                  value={formValues.quantSemestres}
                  onChange={handleFormInputChange}
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
                              type="button"
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
                              <strong>Capacidades Básicas ou Técnicas:</strong>{" "}
                              {discipline.capBasTecCourse.join(", ")}{" "}
                            </p>

                            <p>
                              <strong>Capacidades Socioemocionais:</strong>
                              {discipline.capSocioCourse.join(", ")}{" "}
                            </p>

                            <div className="knowledge-container">
                              <strong>Conhecimentos:</strong>
                              <ul>
                                {/* convertendo a string JSON armazenada no knowledgeInput de volta para um objeto utilizável */}
                                {JSON.parse(
                                  discipline.knowledgeInput
                                  /* percorrendo a lista de tópicos, onde cada tópico é topic e seu indice é armazenado em topicIndex*/
                                ).topicos.map(
                                  (
                                    topic: {
                                      tituloTopico: string;
                                      subTopicos: any[];
                                    },
                                    topicIndex: number
                                  ) => (
                                    /* cria um item de lista para cada tópico. cada item precisa de uma chave única para identificar elementos, para isso utilizamos topicIndex. */
                                    <li key={`topic-${topicIndex}`}>
                                      <strong>
                                        {topicIndex + 1}. {topic.tituloTopico}
                                      </strong>
                                      <ul>
                                        {/* itera por todos os subtópicos do tópico atual */}
                                        {topic.subTopicos.map(
                                          (
                                            subtopic: {
                                              tituloSubtopico: string;
                                              detalhes: string[];
                                            },
                                            subIndex: number
                                          ) => (
                                            /* cria-se um item na lista para cada subtópico */
                                            <li key={`subtopic-${subIndex}`}>
                                              {/* formatando o subtópico com o número do tópico + subtópico */}
                                              {topicIndex + 1}.{subIndex + 1}.{" "}
                                              {subtopic.tituloSubtopico}
                                              {/* só renderiza a lista de detalhes, se houver algum */}
                                              {subtopic.detalhes.length > 0 && (
                                                <ul>
                                                  {/* percorre pelos detalhes do subtópico atual */}
                                                  {subtopic.detalhes.map(
                                                    (
                                                      detail: string,
                                                      detailIndex: number
                                                    ) => (
                                                      <li
                                                        key={`detail-${detailIndex}`}
                                                      >
                                                        {/* formatando o número dos detalhes com: número do tópico + subtópico + detalhe */}
                                                        {topicIndex + 1}.
                                                        {subIndex + 1}.
                                                        {detailIndex + 1}.{" "}
                                                        {detail}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              )}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
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
                            className="delete-discipline"
                            onClick={(event) =>
                              deleteDiscipline(event, semester, index)
                            }
                          >
                            <Trash />
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
                      type="textarea"
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

                  <div className="input-fieldd">
                    <InputField
                      id="topic"
                      name="capBasTecCourse"
                      label="Capacidades Básicas ou Técnicas"
                      type="textarea"
                      value={popupFormValues.capBasTecCourse}
                      onChange={handlePopupInputChange}
                    />
                  </div>

                  <div className="input-fieldd">
                    <InputField
                      id="topic"
                      name="capSocioCourse"
                      label="Capacidades Socioemocionais"
                      type="textarea"
                      value={popupFormValues.capSocioCourse}
                      onChange={handlePopupInputChange}
                    />
                  </div>

                  <h3 className="section-title">Conhecimentos</h3>
                  <div className="input-fieldd">
                    <InputField
                      id="knowledgeInput"
                      name="knowledgeInput"
                      label="Conhecimentos (cole o texto com os tópicos, subtópicos e detalhes)"
                      type="textarea"
                      value={popupFormValues.knowledgeInput || ""}
                      onChange={handlePopupInputChange}
                    />
                  </div>

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
            <button className="save-course" onClick={backPlanCourse}>
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
