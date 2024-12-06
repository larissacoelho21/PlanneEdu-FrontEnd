/* importações de bibliotecas, dependências e arquivos*/
import "../../Css/Opp/AddPlanoCurso.css";
import React, { useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { PopUp } from "../../Components/PopUp/PopUp-v2";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { backPlanCourse } from "../../Services/Axios";
import { InputField } from "../../Components/Inputs/InputField/Field/InputField";

type conhecimentoEstrutura = {
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
  nome: string;
  objetivo: string;
  cargaHoraria: number | null;
  capaBasicaOuTecnica: string[];
  capaSocioemocional: string[];
  conhecimento: {
    topicos: {
      tituloTopico: string;
      subTopicos: {
        tituloSubtopico: string;
        detalhes: string[];
      }[];
    }[];
  };
  ambiente: string;
};

/* tipificação dos valores do formulário */
type planCourseData = {
  nome: string;
  categoria: string;
  objetivo: string;
  requisitosAcesso: string;
  competenciasProfissionais: string;
  cargaHoraria: number | null;
  qtdSemestre: number | null;
  semestre: {
    numero: number;
    unidadeCurricular: string[];
  }[];
  materias: {
    nome: string;
    semCorrespondente: number[];
    cargaHoraria: number | null;
    objetivo: string;
    capaBasicaOuTecnica: string[];
    capaSocioemocional: string[];
    conhecimento: conhecimentoEstrutura;
    ambiente: string;
  }[];
};

export function AddPlanoCurso() {
  /* ======== construção das funcionalidades ======== */
  /* declaração de estados */
  /* estado para controle de exibição do popup */
  const [showPopUpGrade, setShowPopUpGrade] = useState(false);
  const togglePopUpGrade = () => setShowPopUpGrade((prev) => !prev);

  /* estado único para diferentes dados do formulário */
  const [formData, setFormData] = useState<planCourseData>({
    nome: "",
    categoria: "",
    objetivo: "",
    requisitosAcesso: "",
    competenciasProfissionais: "",
    cargaHoraria: null,
    qtdSemestre: null,
    semestre: [
      { numero: 1, unidadeCurricular: [] },
      { numero: 2, unidadeCurricular: [] },
      { numero: 3, unidadeCurricular: [] },
      { numero: 4, unidadeCurricular: [] },
    ],
    materias: [],
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

  /* ======== funções para inputar os conhecimentos (tópicos, subtópicos e detalhes) ======== */
  const processKnowledgeInput = (inputText: string): conhecimentoEstrutura => {
    /* Dividindo o texto por linhas e removendo espaços extras */
    const lines = inputText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    /* Objeto inicial para armazenar os tópicos */
    const conhecimento: conhecimentoEstrutura = { topicos: [] };

    /* Variáveis para controlar o tópico e subtópico atuais */
    let currentTopic: { tituloTopico: string; subTopicos: any[] } | null = null;
    let currentSubtopic: {
      tituloSubtopico: string;
      detalhes: string[];
    } | null = null;

    /* Percorrendo cada linha do texto */
    for (const line of lines) {
      /* Identificando tópicos */
      if (/^\d+\.\s/.test(line)) {
        /* Finalizando subtópico pendente */
        if (currentSubtopic) {
          currentTopic?.subTopicos.push(currentSubtopic);
          currentSubtopic = null;
        }
        /* Finalizando tópico anterior */
        if (currentTopic) {
          conhecimento.topicos.push(currentTopic);
        }
        /* Criando novo tópico */
        currentTopic = {
          tituloTopico: line.replace(/^\d+\.\s*/, ""),
          subTopicos: [],
        };
      } else if (/^\d+\.\d+\.\s/.test(line)) {
        /* Identificando subtópicos */
        /* Finalizando subtópico anterior */
        if (currentSubtopic) {
          currentTopic?.subTopicos.push(currentSubtopic);
        }
        /* Criando novo subtópico */
        currentSubtopic = {
          tituloSubtopico: line.replace(/^\d+\.\d+\.\s*/, ""),
          detalhes: [],
        };
      } else if (/^\d+\.\d+\.\d+\.\s/.test(line)) {
        /* Identificando detalhes */
        /* Adicionando detalhe ao subtópico atual */
        currentSubtopic?.detalhes.push(line.replace(/^\d+\.\d+\.\d+\.\s*/, ""));
      }
    }

    /* Finalizando quaisquer tópicos e subtópicos pendentes */
    if (currentSubtopic) {
      currentTopic?.subTopicos.push(currentSubtopic);
    }
    if (currentTopic) {
      conhecimento.topicos.push(currentTopic);
    }

    return conhecimento;
  };

  /* função para processar o texto inserido, transformando em uma lista */
  const processCapacitiesToList = (inputText: string | string[]): string[] => {
    if (Array.isArray(inputText)) {
      return inputText;
    }
  
    return inputText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
  };
  

  /* função para resetar dados */
  const resetPopupStates = () => {
    setFormData((prevData) => ({
      ...prevData,

      materias: [
        {
          nome: "",
          semCorrespondente: [],
          cargaHoraria: null,
          objetivo: "",
          capaBasicaOuTecnica: [],
          capaSocioemocional: [],
          conhecimento: { topicos: [] },
          ambiente: "",
        },
      ],
    }));
    setEditingDiscipline(null);
  };

  /* função para salvar disciplina, editada ou não */
  const saveDiscipline = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectedSemester !== null && formData.materias[0]?.nome.trim() !== "") {
      const newDiscipline = { ...formData.materias[0] };

      setSemesterData((prevState) => ({
        ...prevState,
        [selectedSemester]: [
          ...(prevState[selectedSemester] || []),
          newDiscipline,
        ],
      }));
      
      /* limpando os dados da matéria/disciplina depois de salvar */
      setFormData((prevData) => ({
        ...prevData,
        materias: [
          {
            nome: "",
            semCorrespondente: [],
            cargaHoraria: null,
            objetivo: "",
            capaBasicaOuTecnica: [],
            capaSocioemocional: [],
            conhecimento: { topicos: [] },
            ambiente: "",
          },
        ],
      }));

      setShowPopUpGrade(false);
      toast.success("Disciplina adicionada com sucesso!");
    } else {
      toast.error("Preencha todos os campos do popup.");
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

      resetPopupStates();
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
    setFormData({
      nome: "",
      categoria: "",
      objetivo: "",
      requisitosAcesso: "",
      competenciasProfissionais: "",
      cargaHoraria: null,
      qtdSemestre: null,
      semestre: [
        { numero: 1, unidadeCurricular: [] },
        { numero: 2, unidadeCurricular: [] },
        { numero: 3, unidadeCurricular: [] },
        { numero: 4, unidadeCurricular: [] },
      ],
      materias: [
        {
          nome: "",
          semCorrespondente: [],
          cargaHoraria: null,
          objetivo: "",
          capaBasicaOuTecnica: [],
          capaSocioemocional: [],
          conhecimento: {
            topicos: [],
          },
          ambiente: "",
        },
      ],
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
  const validateFormData = (data: planCourseData) => {
    if (!data.nome || !data.categoria || !data.objetivo || !data.requisitosAcesso) {
      throw new Error("Preencha todos os campos principais do plano de curso!");
    }
  
    if (!data.materias || data.materias.length === 0) {
      throw new Error("Adicione pelo menos uma matéria ao plano de curso.");
    }
  
    data.materias.forEach((materia, index) => {
      if (
        !materia.nome ||
        !materia.semCorrespondente ||
        !materia.cargaHoraria ||
        !materia.objetivo ||
        !materia.capaBasicaOuTecnica.length ||
        !materia.capaSocioemocional.length ||
        !materia.ambiente
      ) {
        throw new Error(`Os campos da matéria no índice ${index} estão incompletos.`);
      }
    });
  };

  const onBackendChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    fieldPath: string
  ) => {
    const { value } = event.target;
  
    setFormData((prevState) => {
      const keys = fieldPath.split(".");
      const updatedState = { ...prevState };
  
      let current: any = updatedState;
  
      keys.slice(0, -1).forEach((key) => {
        const indexMatch = key.match(/\[(\d+)\]/);
        if (indexMatch) {
          const arrayKey = key.split("[")[0];
          const index = parseInt(indexMatch[1], 10);
  
          /* verificando se o array/lista existe e se o index é válido */
          if (!current[arrayKey]) current[arrayKey] = [];
          if (!current[arrayKey][index]) current[arrayKey][index] = {};
  
          current = current[arrayKey][index];
        } else {
          if (!current[key]) current[key] = {};
          current = current[key];
        }
      });
  
      current[keys[keys.length - 1]] = value;
      return updatedState;
    });
  };  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
    /* validando formData */
    validateFormData(formData);

    /* processando dados */
    const processedFormData = {
      ...formData,
      materias: formData.materias.map((materia) => ({
        ...materia,
        capaBasicaOuTecnica: processCapacitiesToList(
          materia.capaBasicaOuTecnica.join("\n") || ""
        ),
        capaSocioemocional: processCapacitiesToList(
          materia.capaSocioemocional.join("\n") || ""
        ),
        conhecimento: processKnowledgeInput(
          JSON.stringify(materia.conhecimento || { topicos: [] })
        ),
      })),
    };

    console.log("Dados processados antes do envio:", processedFormData);

    const response = await backPlanCourse(processedFormData);
    toast.success("Plano de curso enviado com sucesso!");
    console.log("Resposta do servidor:", response);
  } catch (error: any) {
    console.error("Erro ao enviar:", error.response || error.message);
    toast.error(error.message || "Erro ao enviar o plano de curso.");
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

        <form onSubmit={handleSubmit} className="form-course">
          <div className="inputs-opp">
            <div className="input-fieldd">
              <InputField
                label="Nome do Curso"
                name="nome"
                type="text"
                id="name-course"
                value={formData.nome}
                onBackendChange={(event) => onBackendChange(event, "nome")}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Categoria"
                id="categoria"
                value={formData.categoria}
                type="select"
                options={[
                  { value: "Tecnologia", label: "Tecnologia" },
                  { value: "Comunicação", label: "Comunicação" },
                ]}
                onBackendChange={(event) => onBackendChange(event, "categoria")}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Objetivo"
                name="objectiveCourse"
                type="textarea"
                id="obj-course"
                value={formData.objetivo}
                onBackendChange={(event) => onBackendChange(event, "objetivo")}
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Requisitos de Acesso"
                name="requisitosAcesso"
                type="textarea"
                id="req-acesso"
                value={formData.requisitosAcesso}
                onBackendChange={(event) =>
                  onBackendChange(event, "requisitosAcesso")
                }
              />
            </div>
            <div className="input-fieldd">
              <InputField
                label="Competências"
                name="competenciasProfissionais"
                type="text"
                id="compt-course"
                value={formData.competenciasProfissionais}
                onBackendChange={(event) =>
                  onBackendChange(event, "competenciasProfissionais")
                }
              />
            </div>
            <div className="input-row">
              <div className="input-fieldd">
                <InputField
                  label="Carga Horária"
                  name="cargaHoraria"
                  type="number"
                  id="cargah-course"
                  value={formData.cargaHoraria}
                  onBackendChange={(event) =>
                    onBackendChange(event, "cargaHoraria")
                  }
                />
              </div>
              <div className="input-fieldd">
                <InputField
                  label="Quantidade de semestres"
                  name="qtdSemestre"
                  type="number"
                  id="semestres-course"
                  value={formData.qtdSemestre}
                  onBackendChange={(event) =>
                    onBackendChange(event, "qtdSemestre")
                  }
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
                            <h4>{discipline.nome}</h4>
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
                            <strong>Objetivo:</strong> {discipline.objetivo}
                          </p>
                        </div>

                        {/* detalhes expandíveis no dropdown */}
                        {dropdownStateDiscipline === index && (
                          <div className="card-details">
                            <p>
                              <strong>Capacidades Básicas ou Técnicas:</strong>{" "}
                              {discipline.capaBasicaOuTecnica.join(", ")}{" "}
                            </p>

                            <p>
                              <strong>Capacidades Socioemocionais:</strong>
                              {discipline.capaSocioemocional.join(", ")}{" "}
                            </p>

                            <div className="knowledge-container">
                              <strong>Conhecimentos:</strong>
                              <ul>
                                {/* convertendo a string JSON armazenada no knowledgeInput de volta para um objeto utilizável */}
                                {discipline.conhecimento.topicos.map(
                                  (
                                    topic: {
                                      tituloTopico: string;
                                      subTopicos: any[];
                                    },
                                    topicIndex: number
                                  ) => (
                                    <li key={`topic-${topicIndex}`}>
                                      <strong>
                                        {topicIndex + 1}. {topic.tituloTopico}
                                      </strong>
                                      <ul>
                                        {topic.subTopicos.map(
                                          (
                                            subtopic: {
                                              tituloSubtopico: string;
                                              detalhes: string[];
                                            },
                                            subIndex: number
                                          ) => (
                                            <li key={`subtopic-${subIndex}`}>
                                              {topicIndex + 1}.{subIndex + 1}.{" "}
                                              {subtopic.tituloSubtopico}
                                              {subtopic.detalhes.length > 0 && (
                                                <ul>
                                                  {subtopic.detalhes.map(
                                                    (detail, detailIndex) => (
                                                      <li
                                                        key={`detail-${detailIndex}`}
                                                      >
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
                      name="nome"
                      label="Unidade Curricular"
                      type="text"
                      value={formData.materias[0]?.nome || ""}
                      onBackendChange={(event) =>
                        onBackendChange(event, "materias[0].nome")
                      }
                    />
                  </div>
                  <div className="input-fieldd">
                    <InputField
                      id="obj"
                      label="Objetivo"
                      name="objetivo"
                      type="textarea"
                      value={formData.materias[0]?.objetivo || ""}
                      onBackendChange={(event) =>
                        onBackendChange(event, "materias[0].objetivo")
                      }
                    />
                  </div>
                  <div className="input-fieldd">
                    <InputField
                      id="carga-h"
                      name="cargaHoraria"
                      label="Carga Horária"
                      type="number"
                      value={formData.materias[0]?.cargaHoraria || null}
                      onBackendChange={(event) =>
                        onBackendChange(event, "materias[0].cargaHoraria")
                      }
                    />
                  </div>
                  <h3 className="section-title">
                    Competências Específicas e Socioemocionais
                  </h3>

                  <div className="input-fieldd">
                    <InputField
                      id="capaBasicTec"
                      name="capaBasicaOuTecnica"
                      label="Capacidades Básicas ou Técnicas"
                      type="textarea"
                      value={String(
                        formData.materias[0]?.capaBasicaOuTecnica ?? ""
                      )} /* forçando o valor a ser string */
                      onBackendChange={(event) =>
                        onBackendChange(
                          event,
                          "materias[0].capaBasicaOuTecnica"
                        )
                      }
                    />
                  </div>

                  <div className="input-fieldd">
                    <InputField
                      id="cappaSocio"
                      name="capaSocioemocional"
                      label="Capacidades Socioemocionais"
                      type="textarea"
                      value={String(
                        formData.materias[0]?.capaSocioemocional ?? ""
                      )}
                      onBackendChange={(event) =>
                        onBackendChange(event, "materias[0].capaSocioemocional")
                      }
                    />
                  </div>

                  <h3 className="section-title">Conhecimentos</h3>
                  <div className="input-fieldd">
                    <InputField
                      id="conhecimentos"
                      name="conhecimento"
                      label="Conhecimentos (cole o texto com os tópicos, subtópicos e detalhes)"
                      type="textarea"
                      value={(
                        formData.materias[0]?.conhecimento?.topicos || []
                      ).join(", ")}
                      onBackendChange={(event) =>
                        onBackendChange(event, "materias[0].conhecimento")
                      }
                    />
                  </div>

                  <div className="input-fieldd">
                    <InputField
                      id="ambiente"
                      name="ambiente"
                      label="Ambiente Pedagógico"
                      type="text"
                      value={formData.materias[0]?.ambiente || ""}
                      onBackendChange={(event) =>
                        onBackendChange(event, "materias[0].ambiente")
                      }
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
            <button className="save-course" type="submit">
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
