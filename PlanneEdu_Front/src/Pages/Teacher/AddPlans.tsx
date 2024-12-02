/* importações dos icones, bibliotecas, css e componentes */
import "../../Css/Teacher/AddPlans.css";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { PopUp } from "../../Components/PopUp/PopUp-v2";
import { CodeXml, GraduationCap, BookMarked, Plus, Check } from "lucide-react";
import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "sonner";
import DatePicker from "react-multi-date-picker";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { ButtonAdd } from "../../Components/Buttons/More/More";

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

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
  maxLength?: number;
  maxValue?: number;
}

/* função do componente `InputField` com as propriedades desestruturadas e valores padrão */
function InputField({
  id,
  label,
  type = "text",
  value = "",
  onChange,
  onWheel,
  maxLength,
  maxValue,
}: InputFieldProps) {
  const [localValue, setLocalValue] = useState<string | number>(value);
  /* verificando se o campo está preenchido para aplicar estilos ou animações (booleano) */
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    setIsFilled(localValue !== "");
  }, [localValue]);

  /* função para gerenciar a mudança de valor do input */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: string = event.target.value;

    /* limita o comprimento do valor de entrada */
    if (maxLength && inputValue.length > maxLength) {
      /* corta o excedente */
      inputValue = inputValue.slice(0, maxLength);
    }

    /* converte para número se o tipo do input for "number" */
    if (type === "number") {
      let numericValue = inputValue !== "" ? parseFloat(inputValue) : "";

      /* verifica o valor máximo permitido */
      if (
        maxValue !== undefined &&
        typeof numericValue === "number" &&
        numericValue > maxValue
      ) {
        numericValue = maxValue;
      }

      setLocalValue(numericValue);
    } else {
      setLocalValue(inputValue);
    }

    /* propaga o valor atualizado para o pai, se `onChange` estiver definido */
    if (onChange) {
      event.target.value = inputValue;
      onChange(event);
    }
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="label-all" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-all"
        id={id}
        type={type}
        value={localValue}
        onChange={handleInputChange}
        onWheel={onWheel}
      />
    </fieldset>
  );
}

export function AddPlans() {
  /* ======== declaração de estados dos popups ======== */
  const [showPopUpPlan, setShowPopUpPlan] = useState(false);
  const togglePopUpPlan = () => setShowPopUpPlan(!showPopUpPlan);

  const [showPopUpClasses, setShowPopUpClasses] = useState(false);
  const togglePopUpClasses = () => setShowPopUpClasses(!showPopUpClasses);

  const [showPopUpStrategy, setShowPopUpStrategy] = useState(false);
  const togglePopUpStrategy = () => setShowPopUpStrategy(!showPopUpStrategy);

  const [strategyIdEdit, setStrategyIdEdit] = useState<number | null>(null);

  const closePopup = () => {
    setShowPopUpPlan(false);
    setShowPopUpClasses(false);
    setShowPopUpStrategy(false);
    setEditingStrategyIndex(null);
    setSelectedDates([]);
    setCargaHoraria(null);
    setValueConhecimentosStra([]);
    setValueEstrategiasStra([]);
    setValueRecursosStra([]);
    setPerguntasMediadoras("");
  };

  /* ======== função para a remoção de itens com base em seu índice ======== */
  /* "React.Dispatch<React.SetStateAction<any[]>>" => define o tipo de 'setData' como uma função que atualiza o estado de um array de qualquer tipo (any) */
  const DeleteData = (
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    index: number
  ) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    toast.success("Deletado com sucesso!");
  };

  /* ======== funções e configurações referentes as estratégias ======== */
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  /* armazena as datas escolhidas, é uma array/lista */
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  /* armazena a data inputada no momento */
  const [dateInput, setDateInput] = useState("");
  const [isDateSubmitted, setIsDateSubmitted] = useState(false);

  const [cargaHoraria, setCargaHoraria] = useState<number | null>(null);
  const [valueConhecimentosStra, setValueConhecimentosStra] = useState<
    SelectOption[]
  >([]);
  const [valueEstrategiasStra, setValueEstrategiasStra] = useState<
    SelectOption[]
  >([]);
  const [valueRecursosStra, setValueRecursosStra] = useState<SelectOption[]>(
    []
  );
  const [valueCapTecnicasStra, setValueCapTecnicasStra] = useState<
    SelectOption[]
  >([]);
  const [valueCapSocioStra, setValueCapSocioStra] = useState<SelectOption[]>(
    []
  );
  const [perguntasMediadoras, setPerguntasMediadoras] = useState<string>("");

  /* definindo a estrutura do tipo dos dados */
  type Strategy = {
    dates: string[];
    cargaHoraria: number | null;
    conhecimentos: (string | number)[];
    estrategias: (string | number)[];
    recursos: (string | number)[];
    perguntasMediadoras: string;
  };

  /* função para lidar com a mudança de dados no input de carga horária */
  const handleCargaHorariaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setCargaHoraria(value ? Number(value) : null);
  };

  const [editingStrategyIndex, setEditingStrategyIndex] = useState<
    number | null
  >(null);

  /* função para iniciar a edição de uma estratégia */
  const startEditingStra = (index: number, id: number) => {
    const strategyToEdit = strategies[index];

    console.log(id);

    setStrategyIdEdit(id);

    setEditingStrategyIndex(index);
    setSelectedDates(strategyToEdit.dates);
    setCargaHoraria(strategyToEdit.cargaHoraria);

    /* preenche os selects de conhecimentos, estratégias e recursos com as opções anteriormente inputadas */
    setValueConhecimentosStra(
      strategyToEdit.conhecimentos
        .map((value) => options.find((option) => option.value === value))
        .filter((option): option is SelectOption => option?.label !== undefined)
    );

    setValueEstrategiasStra(
      strategyToEdit.estrategias
        .map((value) => options.find((option) => option.value === value))
        .filter((option): option is SelectOption => option?.label !== undefined)
    );

    setValueRecursosStra(
      strategyToEdit.recursos
        .map((value) => options.find((option) => option.value === value))
        .filter((option): option is SelectOption => option?.label !== undefined)
    );
    setPerguntasMediadoras(strategyToEdit.perguntasMediadoras);

    togglePopUpStrategy();
  };

  /* função para salvar a edição da estratégia*/
  const editStrategy = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /* validando se a carga horária recebe valores válidos */
    if (cargaHoraria === null || parseFloat(cargaHoraria.toString()) <= 0) {
      toast.error(
        "A carga horária deve ser maior que 0! Tente novamente com um valor válido."
      );
      return;
    }

    /* analisa se todos os campos necessários estão preenchidos */
    if (
      selectedDates.length === 0 ||
      cargaHoraria === null ||
      valueConhecimentosStra.length === 0 ||
      valueEstrategiasStra.length === 0 ||
      valueRecursosStra.length === 0 ||
      !perguntasMediadoras.trim()
    ) {
      toast.error("Preencha todos os campos necessários!");
      return;
    }

    /* cria a estratégia atualizada com os dados do formulário */
    const updatedStrategy = {
      dates: selectedDates,
      cargaHoraria: Number(cargaHoraria),
      conhecimentos: valueConhecimentosStra.map((item) => item.value),
      estrategias: valueEstrategiasStra.map((item) => item.value),
      recursos: valueRecursosStra.map((item) => item.value),
      perguntasMediadoras,
    };

    /* verifica se o índice de edição não é nulo */
    if (editingStrategyIndex !== null) {
      /* atualiza a estratégia no índice correspondente */
      const updatedStrategies = [...strategies];
      updatedStrategies[editingStrategyIndex] = updatedStrategy;

      /* atualiza com os novos dados */
      setStrategies(updatedStrategies);

      /* reseta os valores dos campos */
      setSelectedDates([]);
      setCargaHoraria(null);
      setValueConhecimentosStra([]);
      setValueEstrategiasStra([]);
      setValueRecursosStra([]);
      setPerguntasMediadoras("");

      toast.success("Estratégia editada com sucesso!");
      setEditingStrategyIndex(null);
      togglePopUpStrategy();
    }
  };

  const createStrategy = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /* validando se a carga horária recebe valores válidos */
    if (cargaHoraria === null || parseFloat(cargaHoraria.toString()) <= 0) {
      toast.error(
        "A carga horária deve ser maior que 0! Tente novamente com um valor válido."
      );
      return;
    }

    /* verificando se todos os campos necessários estão preenchidos */
    if (
      selectedDates.length === 0 ||
      cargaHoraria === null ||
      valueConhecimentosStra.length === 0 ||
      valueEstrategiasStra.length === 0 ||
      valueRecursosStra.length === 0 ||
      !perguntasMediadoras.trim()
    ) {
      toast.error("Preencha todos os campos necessários!");
      return;
    }

    const newStrategy: Strategy = {
      dates: selectedDates,
      cargaHoraria,
      conhecimentos: valueConhecimentosStra.map(
        (conhecimento) => conhecimento.value
      ),
      estrategias: valueEstrategiasStra.map((estrategia) => estrategia.value),
      recursos: valueRecursosStra.map((recurso) => recurso.value),
      perguntasMediadoras,
    };

    setStrategies([...strategies, newStrategy]);

    setSelectedDates([]);
    setCargaHoraria(null);
    setValueConhecimentosStra([]);
    setValueEstrategiasStra([]);
    setValueRecursosStra([]);
    setPerguntasMediadoras("");

    toast.success("Estratégia criada com sucesso!");
    togglePopUpStrategy();
  };

  type LabelMap = {
    [key: string]: string;
  };

  const labelMap: LabelMap = options.reduce((acc: LabelMap, option) => {
    acc[option.value] = option.label;
    return acc;
  }, {} as LabelMap);

  /* ======== fuções e configurações do planejamento de aulas ======== */
  /* definindo a estrutura genérica de itens complexos */
  type itemComplex = {
    label: string;
    value: number;
  };

  /* tipificando cada categoria */
  type conhecimentos = itemComplex;
  type estrategias = itemComplex;
  type recursos = itemComplex;

  /* definindo a estrutura do card */
  type cardPlan = {
    dataInicial: string;
    dataFinal: string;
    conhecimentos: (string | number)[];
    estrategias: (string | number)[];
    recursos: (string | number)[];
  };

  /* configurações para a criação do card referente ao planejamento */
  interface Plans {
    dateInicial: string;
    dateFinal: string;
    conhecimentos: (string | number)[];
    estrategias: (string | number)[];
    recursos: (string | number)[];
  }

  /* armazena os dados referente ao planejamento, é uma array */
  const [plans, setPlans] = useState<Plans[]>([]);
  /* gerencia os valores inputados para cada categoria */
  const [valueConhecimentos, setValueConhecimentos] = useState<SelectOption[]>(
    []
  );
  const [valueEstrategias, setValueEstrategias] = useState<SelectOption[]>([]);
  const [valueRecursos, setValueRecursos] = useState<SelectOption[]>([]);

  /* estado para armazenar datas */
  const [dateInicial, setDateInicial] = useState<string>("");
  const [dateFinal, setDateFinal] = useState<string>("");

  /* funções referentes as datas utilizadas na aplicação */
  /* ======== formatação e validação das datas ======== */
  const convertToISO = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const validateDates = (startISO: string, endISO: string) => {
    const start = new Date(startISO);
    const end = new Date(endISO);

    if (end < start) {
      toast.error(
        "A data final não pode ser menor que a data inicial! Tente novamente com uma data válida."
      );
      return false;
    } else {
      return true;
    }
  };

  const createPlans = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    /* converte para o formato ISO */
    const startDateISO = convertToISO(dateInicial);
    const endDateISO = convertToISO(dateFinal);

    /* verificando se as datas estão no formato adequado */
    if (!startDateISO || !endDateISO) {
      toast.error("Formato de data inválido! Use o formato DD/MM/AAAA.");
      return;
    }

    if (!validateDates(startDateISO, endDateISO)) {
      return;
    }

    /* garantindo que todos os campos foram preenchidos */
    if (
      valueConhecimentos.length === 0 ||
      valueEstrategias.length === 0 ||
      valueRecursos.length === 0
    ) {
      toast.error("Preencha todos os campos necessários!");
      return;
    }

    const newPlan: Plans = {
      dateInicial: dateInicial,
      dateFinal: dateFinal,
      conhecimentos: valueConhecimentos.map(
        (conhecimento) => conhecimento.value
      ),
      estrategias: valueEstrategias.map((estrategia) => estrategia.value),
      recursos: valueRecursos.map((recurso) => recurso.value),
    };

    setPlans([...plans, newPlan]);
    /* resetar as informações dos selects */
    setValueConhecimentos([]);
    setValueEstrategias([]);
    setValueRecursos([]);
    setDateInicial("");
    setDateFinal("");

    toast.success("Planejamento adicionado com sucesso!");
    togglePopUpPlan();
  };

  /* configurações e função para editar os dados referente ao planejamento de aulas */
  /* estado para rastrear o índice do plano que está sendo editado */
  const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);

  /* início do processo de edição, preenchimento do formulário com os dados do plano existente e marcando o índice do plano que está sendo editado. */
  const startEditingPlan = (index: number) => {
    const planToEdit = plans[index];

    setEditingPlanIndex(index);
    setDateInicial(planToEdit.dateInicial);
    setDateFinal(planToEdit.dateFinal);

    /* preenche os selects com as opções anteriormente inputadas */
    setValueConhecimentos(
      planToEdit.conhecimentos
        .map((value) => options.find((option) => option.value === value))
        .filter((option): option is SelectOption => option?.label !== undefined)
    );
    setValueEstrategias(
      planToEdit.estrategias
        .map((value) => options.find((option) => option.value === value))
        .filter((option): option is SelectOption => option?.label !== undefined)
    );
    setValueRecursos(
      planToEdit.recursos
        .map((value) => options.find((option) => option.value === value))
        .filter((option): option is SelectOption => option?.label !== undefined)
    );

    togglePopUpClasses();
  };

  /* conclusão do processo de edição, salvando as alterações feitas no plano e atualizando o estado com os novos dados */
  const editPlans = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const startDateISO = convertToISO(dateInicial);
    const endDateISO = convertToISO(dateFinal);

    if (!startDateISO || !endDateISO) {
      toast.error("Formato de data inválido! Use o formato DD/MM/AAAA.");
      return;
    }

    if (!validateDates(startDateISO, endDateISO)) {
      return;
    }

    /* verifique se todos os campos estão preenchidos */
    if (
      valueConhecimentos.length === 0 ||
      valueEstrategias.length === 0 ||
      valueRecursos.length === 0
    ) {
      toast.error("Preencha todos os campos necessários!");
      return;
    }

    /* cria um novo plano usando a lógica existente */
    const updatedPlan: Plans = {
      dateInicial: dateInicial,
      dateFinal: dateFinal,
      conhecimentos: valueConhecimentos.map(
        (conhecimento) => conhecimento.value
      ),
      estrategias: valueEstrategias.map((estrategia) => estrategia.value),
      recursos: valueRecursos.map((recurso) => recurso.value),
    };

    /* verifica se o índice de edição não é nulo */
    if (editingPlanIndex !== null) {
      /* atualiza o plano na posição correspondente */
      const updatedPlans = [...plans];
      updatedPlans[editingPlanIndex] = updatedPlan;

      /* atualiza o estado com os novos planos */
      setPlans(updatedPlans);
    } else {
      toast.error("Erro: índice de edição não encontrado.");
      return;
    }

    /* reseta os valores dos selects e das datas */
    setValueConhecimentos([]);
    setValueEstrategias([]);
    setValueRecursos([]);
    setDateInicial("");
    setDateFinal("");

    toast.success("Planejamento editado com sucesso!");
    togglePopUpClasses();
  };

  /* ======== layout e estrutura da página ======== */
  return (
    <main>
      <SubNavbar />
      <div className="info-course">
        <h2>Programação WEB Front-End</h2>

        <div className="tag-course">
          <CodeXml strokeWidth={1.5} />
          <p>Desenvolvimento de Sistemas</p>
        </div>

        <div className="infos-teacher">
          <div className="semester-teacher">
            <GraduationCap strokeWidth={1.5} />
            <p>Arthur Rosa</p>
          </div>
          <div className="students">
            <BookMarked strokeWidth={1.5} />
            <p>Manhã 2023</p>
          </div>
        </div>
      </div>

      <div className="select-planne-course">
        <label htmlFor="" className="label-select">
          Selecione uma matéria
        </label>
        <select name="" id="">
          <option value=""></option>
        </select>
        <h2>
          * Obs: Para continuar você deve selecionar uma matéria
        </h2>
      </div>

      <form className="form">
        <div className="input-field">
          <InputField label="Curso" type="text" id="course" />
        </div>

        <div className="input-field">
          <label className="label">Docente</label>
          <select name="docent">
            <option value="" disabled selected></option>
            <option value="Arthur">Arthur</option>
            <option value="Giovani">Giovani</option>
            <option value="Samuel">Samuel</option>
          </select>
        </div>

        <div className="row">
          <div className="input-field">
            <InputField
              label="Carga Horária"
              type="number"
              id="carg-h"
              onWheel={(event) => event.currentTarget.blur()}
              maxLength={3}
            />
          </div>

          <div className="input-field">
            <InputField
              label="Quantidade de Aulas"
              type="number"
              id="qtd-aulas"
              onWheel={(event) => event.currentTarget.blur()}
              maxLength={3}
            />
          </div>

          <div className="input-field">
            <InputField
              label="Semestre"
              type="number"
              id="semestre"
              onWheel={(event) => event.currentTarget.blur()}
              maxLength={1}
            />
          </div>

          <div className="input-field">
            <InputField
              label="Ano"
              type="number"
              id="ano"
              onWheel={(event) => event.currentTarget.blur()}
              maxLength={4}
            />
          </div>
        </div>

        <div className="input-field">
          <InputField
            label="Descrição da Unidade de Competência"
            type="text"
            id="desc-uc"
          />
        </div>

        <div className="input-field">
          <InputField
            label="Objetivo da Unidade Curricular"
            type="text"
            id="obj-uc"
          />
        </div>

        <div className="input-field">
          <InputField label="Turma" type="text" id="turma" />
        </div>

        <div className="estrategias">
          <h3 className="title-section">
            Estratégias para o desenvolvimento da situação de aprendizagem e
            planejamento da intervenção mediadora
          </h3>

          <div className="capacidades">
            <div className="tecnicas">
              <label>Capacidades Técnicas</label>
              <Multiselect
                options={options}
                value={valueCapTecnicasStra}
                onChange={setValueCapTecnicasStra}
                multiple
              />
            </div>
            <div className="socioemocionais">
              <label>Capacidades Socioemocionais</label>
              <Multiselect
                options={options}
                value={valueCapSocioStra}
                onChange={setValueCapSocioStra}
                multiple
              />
            </div>
          </div>

          <label>Estratégias</label>
          <ButtonAdd
            onClick={(event) => {
              togglePopUpStrategy();
              event.preventDefault();
            }}
          />

          {showPopUpStrategy && (
            <PopUp
              title="Criar estratégia"
              subtitle="Descreva suas estratégias para a criação e desenvolvimento das situações de aprendizagem e o planejamento das intervenções mediadoras"
              onClose={closePopup}
            >
              <div className="pop-body">
                <div className="dates-add">
                  <div className="input-field">
                    <label className="label">Datas</label>
                    <DatePicker
                      multiple
                      value={selectedDates}
                      onChange={(dates) =>
                        setSelectedDates(
                          dates.map((date) => date.format("DD/MM/YYYY"))
                        )
                      }
                      format="DD/MM/YYYY"
                      id="datas-input"
                      style={{
                        borderRadius: "0px",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                <div className="input-field">
                  <InputField
                    type="number"
                    label="Carga Horária"
                    id="carga-h"
                    value={cargaHoraria !== null ? cargaHoraria : ""}
                    onChange={handleCargaHorariaChange}
                    onWheel={(event) => event.currentTarget.blur()}
                    maxLength={3}
                  />
                </div>

                <div className="multiselects">
                  <div className="multi-conherel">
                    <label className="label">Conhecimentos Relacionados</label>
                    <Multiselect
                      options={options}
                      value={valueConhecimentosStra}
                      onChange={setValueConhecimentosStra}
                      multiple
                    />
                  </div>

                  <div className="multi-estra">
                    <label className="label">Estratégias de Ensino</label>
                    <Multiselect
                      options={options}
                      value={valueEstrategiasStra}
                      onChange={setValueEstrategiasStra}
                      multiple
                    />
                  </div>

                  <div className="multi-recNam">
                    <label className="label">
                      Recursos e Ambientes Pedagógicos
                    </label>
                    <Multiselect
                      options={options}
                      value={valueRecursosStra}
                      onChange={setValueRecursosStra}
                      multiple
                    />
                  </div>
                </div>

                <div className="input-field">
                  <InputField
                    type="text"
                    label="Perguntas Mediadoras"
                    id="perg-medi"
                    value={perguntasMediadoras}
                    onChange={(e) => setPerguntasMediadoras(e.target.value)}
                  />
                </div>

                <div className="popup-btns">
                  <button
                    onClick={(event) => {
                      if (editingStrategyIndex !== null) {
                        editStrategy(event);
                      } else {
                        createStrategy(event);
                      }
                    }}
                  >
                    {editingStrategyIndex !== null ? "Salvar" : "Criar"}
                  </button>

                  <button onClick={closePopup}>Cancelar</button>
                </div>
              </div>
            </PopUp>
          )}

          {strategies.map((strategy, index) => (
            <div className="card-info">
              <div className="title-card">
                <h1>{strategy.perguntasMediadoras}</h1>
              </div>
              <div className="tag-card">
                <p>Carga Horária: {strategy.cargaHoraria}</p>
              </div>
              <div className="selections">
                <p>
                  <span style={{ fontWeight: "bold" }}>Datas:</span>{" "}
                  {strategy.dates.join(", ")}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Conhecimentos:</span>{" "}
                  {strategy.conhecimentos
                    .map((value) => labelMap[value])
                    .join(", ")}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Estratégias:</span>{" "}
                  {strategy.estrategias
                    .map((value) => labelMap[value])
                    .join(", ")}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Recursos:</span>{" "}
                  {strategy.recursos.map((value) => labelMap[value]).join(", ")}
                </p>
              </div>
              <div className="card-btns">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    startEditingStra(index, index);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    DeleteData(strategies, setStrategies, index);
                  }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="planneraulas">
          <h3 className="title-section">Planejamento de aulas</h3>
          <label>Datas e conhecimentos abordados</label>
          <ButtonAdd
            onClick={(event) => {
              togglePopUpPlan();
              event.preventDefault();
            }}
          />

          {plans.map((plan, index) => (
            <div className="card-info">
              <div className="title-card">
                <h1>
                  {plan.dateInicial} — {plan.dateFinal}
                </h1>
              </div>
              <div className="selections">
                <p>
                  <span style={{ fontWeight: "bold" }}>Conhecimentos:</span>{" "}
                  {plan.conhecimentos
                    .map((value) => labelMap[value])
                    .join(", ")}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Estratégias:</span>{" "}
                  {plan.estrategias.map((value) => labelMap[value]).join(", ")}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Recursos:</span>{" "}
                  {plan.recursos.map((value) => labelMap[value]).join(", ")}
                </p>
              </div>
              <div className="card-btns">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    startEditingPlan(index);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    DeleteData(plans, setPlans, index);
                  }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}

          {showPopUpPlan && (
            <PopUp
              onClose={closePopup}
              title="Planejamento de aulas"
              subtitle="Descreva o conteúdo das aulas e selecione os conhecimentos, recursos e estratégias a serem desenvolvidas."
            >
              <div className="pop-body">
                <div className="datess">
                  <div className="data-prop">
                    <label>Data proposta</label>
                    <ReactInputMask
                      className="input-all"
                      type="text"
                      mask="99/99/9999"
                      value={dateInicial}
                      onChange={(e) => setDateInicial(e.target.value)}
                    />
                  </div>
                  <div className="data-fin">
                    <label>Data final</label>
                    <ReactInputMask
                      className="input-all"
                      type="text"
                      mask="99/99/9999"
                      value={dateFinal}
                      onChange={(e) => setDateFinal(e.target.value)}
                    />
                  </div>
                </div>
                <div className="multiselects">
                  <div className="multi-conhe">
                    <label>Conhecimentos</label>
                    <Multiselect
                      options={options}
                      value={valueConhecimentos}
                      onChange={setValueConhecimentos}
                      multiple
                    />
                  </div>
                  <div className="multi-estra">
                    <label>Estratégias</label>
                    <Multiselect
                      options={options}
                      value={valueEstrategias}
                      onChange={setValueEstrategias}
                      multiple
                    />
                  </div>
                  <div className="multi-rec">
                    <label>Recursos</label>
                    <Multiselect
                      options={options}
                      value={valueRecursos}
                      onChange={setValueRecursos}
                      multiple
                    />
                  </div>
                </div>
                <div className="popup-btns">
                  <button onClick={createPlans}>Salvar</button>
                  <button onClick={() => togglePopUpPlan()}>Cancelar</button>
                </div>
              </div>
            </PopUp>
          )}

          {showPopUpClasses && (
            <PopUp
              onClose={closePopup}
              title="Editar"
              subtitle="Edite as informações referente ao planejamento de aula"
            >
              <div className="pop-body">
                <div className="datess">
                  <div className="data-prop">
                    <label>Data proposta</label>
                    <ReactInputMask
                      className="input-all"
                      type="text"
                      mask="99/99/9999"
                      value={dateInicial}
                      onChange={(e) => setDateInicial(e.target.value)}
                    />
                  </div>
                  <div className="data-fin">
                    <label>Data final</label>
                    <ReactInputMask
                      className="input-all"
                      type="text"
                      mask="99/99/9999"
                      value={dateFinal}
                      onChange={(e) => setDateFinal(e.target.value)}
                    />
                  </div>
                </div>

                <div className="multiselects">
                  <label>Conhecimentos</label>
                  <Multiselect
                    options={options}
                    value={valueConhecimentos}
                    onChange={setValueConhecimentos}
                    multiple
                  />

                  <label>Estratégias</label>
                  <Multiselect
                    options={options}
                    value={valueEstrategias}
                    onChange={setValueEstrategias}
                    multiple
                  />

                  <label>Recursos</label>
                  <Multiselect
                    options={options}
                    value={valueRecursos}
                    onChange={setValueRecursos}
                    multiple
                  />
                </div>

                <div className="popup-btns">
                  <button onClick={editPlans}>Salvar</button>
                  <button onClick={() => togglePopUpClasses()}>Cancelar</button>
                </div>
              </div>
            </PopUp>
          )}
        </div>
        <div className="form-actions">
          <button className="save">
            <Check />
            Salvar alterações
          </button>
          <button>Cancelar</button>
        </div>
      </form>
    </main>
  );
}
