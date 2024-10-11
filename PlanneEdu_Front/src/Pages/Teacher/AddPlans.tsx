/* importações dos icones, bibliotecas, css e componentes */
import "../../Css/Teacher/AddPlans.css";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { PopUp } from "../../Components/PopUp/PopUp-v2";
import { CodeXml, GraduationCap, BookMarked, Plus, Check } from "lucide-react";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { Toaster, toast } from "sonner";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";

/* definindo as opções que serão usadas no multiselect */
const options: SelectOption[] = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

export function AddPlans() {
  /* ======== configurações utilizadas no multiselect ======== */
  const [value, setValue] = useState<SelectOption[]>([]);
  const [value2, setValue2] = useState<SelectOption[]>([]);
  const [value3, setValue3] = useState<SelectOption[]>([]);
  const [value4, setValue4] = useState<SelectOption[]>([]);

  /* ======== popups ======== */
  const [showPopUpEdit, setShowPopUpEdit] = useState(false);
  const togglePopUpEdit = () => {
    setShowPopUpEdit(!showPopUpEdit);
  };
  const [showPopUpPlan, setShowPopUpPlan] = useState(false);
  const togglePopUpPlan = () => {
    setShowPopUpPlan(!showPopUpPlan);
  };
  const [showPopUpClasses, setShowPopUpClasses] = useState(false);
  const togglePopUpClasses = () => {
    setShowPopUpClasses(!showPopUpClasses);
  };

  /* ======== funções e configurações para a criação da tabela ======== */

  /* definindo a estrutura dos dados da tabela, todos os itens terão uma propriedade de texto (text) e seleção (selectedOption) */
  type TableData = {
    text: string;
    selectedOption: string;
  };

  /* gerencia o valor inputado no input de texto */
  const [textInput, setTextInput] = useState<string>("");
  /* gerencia o valor inputado no select */
  const [selectedOption, setSelectedOption] = useState<string>("");
  /* armazena os dados da tabela, é uma array de objetos*/
  const [tableData, setTableData] = useState<TableData[]>([]);

  const [isEditingTable, setIsEditingTable] = useState(false);
  const [editingTableIndex, setEditingTableIndex] = useState<number | null>(
    null
  );

  /* estados para a edição de dados */
  const [editTextInput, setEditTextInput] = useState("");
  const [editSelectedOption, setEditSelectedOption] = useState("");

  /* array das opções presentes no select */
  const selectOptions = ["C", "D"];

  const addData = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (textInput && selectedOption) {
      const newData: TableData = {
        text: textInput,
        selectedOption: selectedOption,
      };
      setTableData([...tableData, newData]);
      setTextInput("");
      setSelectedOption("");
    }
  };

  const editTable = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (editingTableIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editingTableIndex] = {
        text: editTextInput,
        selectedOption: editSelectedOption,
      };
      setTableData(updatedData);
      setIsEditingTable(false);
      setEditingTableIndex(null);
      setShowPopUpEdit(false);
      setEditTextInput("");
      setEditSelectedOption("");
    }
  };

  /* função que remove um item de um array com base no índice fornecido */
  /* "React.Dispatch<React.SetStateAction<any[]>>" => define o tipo de 'setData' como uma função que atualiza o estado de um array de qualquer tipo (any) */
  const DeleteData = (
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    index: number
  ) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  /* ======== fuções e configurações do popup de planejamento de aulas ======== */
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

  /* ======== configurações para a criação do card referente ao planejamento de ensino ======== */
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

  /* ======== formatação e validação das datas ======== */
  const convertToISO = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`; // Formato ISO (YYYY-MM-DD)
  };

  const validateDates = (startISO: string, endISO: string) => {
    const start = new Date(startISO);
    const end = new Date(endISO);

    if (end < start) {
      toast.error("A data final não pode ser menor que a data inicial! Tente novamente com uma data válida.");
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

    if (!validateDates(startDateISO, endDateISO)) {
      return;
    }

    // garantindo que todos os campos foram preenchidos
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

  /*  */
  const startEditingPlan = (index: number) => {
    const planToEdit = plans[index];

    setEditingPlanIndex(index);
    console.log("Index being edited:", editingPlanIndex);
    setDateInicial(planToEdit.dateInicial);
    setDateFinal(planToEdit.dateFinal);
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

  const editPlans = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const startDateISO = convertToISO(dateInicial);
    const endDateISO = convertToISO(dateFinal);

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

        <div className="Info">
          <div className="Teacher">
            <GraduationCap strokeWidth={1.5} />
            <p>Arthur Rosa</p>
          </div>
          <div className="Class">
            <BookMarked strokeWidth={1.5} />
            <p>Manhã 2023</p>
          </div>
        </div>
      </div>
      <form className="form">
        <div className="input-field">
          <label>Curso</label>
          <input type="text" name="course" id="course" />
        </div>

        <div className="input-field">
          <label>Unidade Curricular</label>
          <input type="text" name="uc" id="uc" />
        </div>

        <div className="input-field">
          <label>Docente</label>
          <input type="text" name="docent" id="docent" />
        </div>

        <div className="row">
          <div className="input-field">
            <label>Carga Horária</label>
            <input type="number" name="horas" id="horas" />
          </div>

          <div className="input-field">
            <label>Quantidade de Aulas</label>
            <input type="number" name="aulas" id="aulas" />
          </div>

          <div className="input-field">
            <label>Semestre</label>
            <input type="number" name="semestre" id="semestre" />
          </div>

          <div className="input-field">
            <label>Ano</label>
            <input type="number" name="ano" id="ano" />
          </div>
        </div>

        <div className="input-field">
          <label>Descrição da Unidade de Competência</label>
          <input type="text" name="desc-uc" id="desc-uc" />
        </div>

        <div className="input-field">
          <label>Objetivo da Unidade Curricular</label>
          <input type="text" name="obj-uc" id="obj-uc" />
        </div>

        <div className="input-field">
          <label>Turma</label>
          <input type="text" name="turma" id="turma" />
        </div>

        <h3 className="title-section">
          Estratégias para o desenvolvimento da situação de aprendizagem e
          planejamento da intervenção mediadora
        </h3>

        <div className="row">
          <div className="input-field">
            <label>Data</label>
            <input type="date" name="date" id="datte" className="large-input" />
          </div>
          <div className="input-field">
            <label>Carga Horária</label>
            <input type="number" name="hrs" id="hrs" className="large-input" />
          </div>
        </div>

        <div className="row">
          <div className="captecsocio">
            <label>Capacidades Técnicas e Socioemocionais</label>
            <Multiselect
              options={options}
              value={value}
              onChange={(o) => setValue(o)}
              multiple={true}
            />
          </div>
          <div className="caprelacionadas">
            <label>Capacidades Relacionadas</label>
            <Multiselect
              options={options}
              value={value2}
              onChange={(o) => setValue2(o)}
              multiple={true}
            />
          </div>
        </div>

        <div className="row">
          <div className="estra-ensino">
            <label>Estratégias de ensino</label>
            <Multiselect
              options={options}
              value={value3}
              onChange={(o) => setValue3(o)}
              multiple={true}
            />
          </div>
          <div className="recur-amb">
            <label>Recursos e Ambientes Pedagógicos</label>
            <Multiselect
              options={options}
              value={value4}
              onChange={(o) => setValue4(o)}
              multiple={true}
            />
          </div>
        </div>

        <div className="input-field">
          <label>Perguntas Mediadoras</label>
          <input type="text" name="pergmedia" id="pergmedia" />
        </div>

        <h3 className="title-section">
          Estratégias de avaliação de aprendizagem
        </h3>

        <div className="input-field">
          <label>Instrumentos de Avaliação</label>
          <input type="text" name="inst-avalia" id="inst-avalia" />
        </div>

        <div className="criterios">
          <div className="input-field">
            <label>Critérios de avaliação</label>
            <input
              type="text"
              name="crit-avalia"
              id="crit-avalia"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label>Crítico (C) ou Desejável (D)</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="" disabled></option>
              {selectOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            className="add-btn"
            onClick={addData}
            disabled={!textInput || !selectedOption}
          >
            Adicionar à Tabela
          </button>

          <table className="table-criterios">
            <thead>
              <tr>
                <th>Critérios de avaliação</th>
                <th>Crítico (C) e Desejável (D)</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.text}</td>
                  <td>{data.selectedOption}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={(event) => {
                        event.preventDefault();
                        setEditingTableIndex(index);
                        setEditTextInput(data.text);
                        setEditSelectedOption(data.selectedOption);
                        togglePopUpEdit();
                      }}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => DeleteData(tableData, setTableData, index)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showPopUpEdit && (
            <PopUp
              title="Editar"
              subtitle="Edite as informações referente aos critérios de avaliação"
            >
              <form action="">
                <div className="input-field">
                  <label>Critérios de avaliação</label>
                  <input
                    type="text"
                    value={editTextInput}
                    onChange={(e) => setEditTextInput(e.target.value)}
                  />
                </div>

                <div className="select-pop">
                  <label>Crítico (C) ou Desejável (D)</label>
                  <select
                    value={editSelectedOption}
                    onChange={(e) => setEditSelectedOption(e.target.value)}
                  >
                    <option value="C">Crítico (C)</option>
                    <option value="D">Desejável (D)</option>
                  </select>
                </div>

                <div className="popup-btns">
                  <button onClick={editTable}>Salvar</button>
                  <button onClick={() => togglePopUpEdit()}>Cancelar</button>
                </div>
              </form>
            </PopUp>
          )}
        </div>

        <div className="planneraulas">
          <h3 className="title-section">Planejamento de aulas</h3>
          <label>Datas e conhecimentos abordados</label>
          <button
            className="add-plan"
            onClick={(event) => {
              togglePopUpPlan();
              event.preventDefault();
            }}
          >
            <Plus width={40} height={40} strokeWidth={1.5} />
          </button>

          {plans.map((plan, index) => (
            <div className="card-info">
              <div className="date-plan">
                <h1>
                  {plan.dateInicial} — {plan.dateFinal}
                </h1>
              </div>
              <div className="selections">
                <p>Conhecimentos: {plan.conhecimentos.join(", ")}</p>
                <p>Estratégias: {plan.estrategias.join(", ")}</p>
                <p>Recursos: {plan.recursos.join(", ")}</p>
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
              title="Planejamento de aulas"
              subtitle="Descreva o conteúdo das aulas e selecione os conhecimentos, recursos e estratégias a serem desenvolvidas."
            >
              <div className="popup-body">
                <div className="dates">
                  <div className="data-prop">
                    <label>Data proposta</label>
                    <ReactInputMask
                      type="text"
                      mask="99/99/9999"
                      value={dateInicial}
                      onChange={(e) => setDateInicial(e.target.value)}
                    />
                  </div>
                  <div className="data-fin">
                    <label>Data final</label>
                    <ReactInputMask
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
                  <button onClick={createPlans}>Salvar</button>
                  <button onClick={() => togglePopUpPlan()}>Cancelar</button>
                </div>
              </div>
            </PopUp>
          )}

          {showPopUpClasses && (
            <PopUp
              title="Editar"
              subtitle="Edite as informações referente ao planejamento de aula"
            >
              <div className="popup-body">
                <div className="dates">
                  <div className="data-prop">
                    <label>Data proposta</label>
                    <ReactInputMask
                      type="text"
                      mask="99/99/9999"
                      value={dateInicial}
                      onChange={(e) => setDateInicial(e.target.value)}
                    />
                  </div>
                  <div className="data-fin">
                    <label>Data final</label>
                    <ReactInputMask
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
