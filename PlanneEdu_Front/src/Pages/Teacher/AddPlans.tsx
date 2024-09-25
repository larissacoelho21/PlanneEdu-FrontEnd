/* importações dos icones, css e componentes */
import "../../Css/Teacher/AddPlans.css";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { CodeXml } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { BookMarked } from "lucide-react";
import { Plus } from "lucide-react";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { useState } from "react";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

export function AddPlans() {
  /* ======== configurações utilizadas no multiselect ======== */
  const [value, setValue] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);
  const [value3, setValue3] = useState<SelectOption[]>([options[0]]);
  const [value4, setValue4] = useState<SelectOption[]>([options[0]]);
  const [value5, setValue5] = useState<SelectOption[]>([options[0]]);
  const [value6, setValue6] = useState<SelectOption[]>([options[0]]);

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
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /* array das opções presentes no select */
  const selectOptions = ["C", "D"];

  const addData = () => {
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

  const SaveEdit = () => {
    if (editingIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editingIndex] = {
        text: textInput,
        selectedOption: selectedOption,
      };
      setTableData(updatedData);
      setIsEditing(false);
      setTextInput("");
      setSelectedOption("");
      setEditingIndex(null);
      setShowPopUpAdd(false);
    }
  };

  const DeleteData = (index: number) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  const [showPopUpAdd, setShowPopUpAdd] = useState(false);
  const togglePopUpAdd = () => {
    setShowPopUpAdd(!showPopUpAdd);
  };

  const [showPopUpPlan, setShowPopUpPlan] = useState(false);
  const togglePopUpPlan = () => {
    setShowPopUpPlan(!showPopUpPlan);
  };

  /* ======== layout e estrutura da página ======== */

  return (
    <main>
      <SubNavbar />
      <div className="card-info-disc">
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

      <div className="form">
        <div className="inputt">
          <label>Nome</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="inputt">
          <label>Unidade Curricular</label>
          <input type="text" name="uc" id="uc" />
        </div>
        <div className="inputt">
          <label>Docente</label>
          <input type="text" name="docent" id="docent" />
        </div>
        <div className="row">
          <div className="inputt">
            <label>Carga Horária</label>
            <input type="number" name="horas" id="horas" />
          </div>
          <div className="inputt">
            <label>Quantidade de Aulas</label>
            <input type="number" name="aulas" id="aulas" />
          </div>
          <div className="inputt">
            <label>Semestre</label>
            <input type="number" name="semestre" id="semestre" />
          </div>
          <div className="inputt">
            <label>Ano</label>
            <input type="number" name="ano" id="ano" />
          </div>
        </div>
        <div className="inputt">
          <label>Descrição da Unidade de Competência</label>
          <input type="text" name="desc-uc" id="desc-uc" />
        </div>
        <div className="inputt">
          <label>Objetivo da Unidade Curricular</label>
          <input type="text" name="obj-uc" id="obj-uc" />
        </div>
        <div className="inputt">
          <label>Turma</label>
          <input type="text" name="turma" id="turma" />
        </div>

        <h3 className="title-section">
          Estratégias para o desenvolvimento da situação de aprendizagem e
          planejamento da intervenção mediadora
        </h3>

        <div className="row">
          <div className="inputt">
            <label>Data</label>
            <input type="date" name="horas" id="horas" />
          </div>
          <div className="inputt">
            <label>Carga Horária</label>
            <input type="number" name="hrs" id="hrs" />
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
          <div className="captecsocio">
            <label>Capacidades Técnicas e Socioemocionais</label>
            <Multiselect
              options={options}
              value={value3}
              onChange={(o) => setValue3(o)}
              multiple={true}
            />
          </div>
          <div className="caprelacionadas">
            <label>Capacidades Relacionadas</label>
            <Multiselect
              options={options}
              value={value4}
              onChange={(o) => setValue4(o)}
              multiple={true}
            />
          </div>
        </div>

        <div className="inputt">
          <label>Perguntas Mediadoras</label>
          <input type="text" name="pergmedia" id="pergmedia" />
        </div>

        <h3 className="title-section">Estratégias de avaliação de aprendizagem</h3>

        <div className="inputt">
          <label>Instrumentos de Avaliação</label>
          <input type="text" name="inst-avalia" id="inst-avalia" />
        </div>

        <div className="criterios">
          <div className="inputt">
            <label>Critérios de avaliação</label>
            <input
              type="text"
              name="crit-avalia"
              id="crit-avalia"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
          <div className="inputt">
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

          <button className="add-btn" onClick={addData}>
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
                      onClick={() => {
                        setEditingIndex(index);
                        setTextInput(data.text);
                        setSelectedOption(data.selectedOption);
                        setShowPopUpAdd(true);
                      }}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => DeleteData(index)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showPopUpAdd && (
            <div className="popup-overlay">
              <div className="popup-edit">
                <h2>Editar</h2>
                <div className="inputt">
                  <label>Critérios de avaliação</label>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </div>
                <div className="select-pop">
                  <label>Crítico (C) ou Desejável (D)</label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="C">Crítico (C)</option>
                    <option value="D">Desejável (D)</option>
                  </select>
                </div>
                <div className="edit-btns">
                  <button onClick={SaveEdit}>Salvar alterações</button>
                  <button onClick={() => setShowPopUpAdd(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="planneraulas">
          <h3 className="title-section">Planejamento de aulas</h3>
          <label>Datas e conhecimentos abordados</label>
          <button
            className="add-plan"
            onClick={() => {
              setShowPopUpPlan(true);
            }}
          >
            <Plus width={25} height={25} strokeWidth={2} />
          </button>

          {showPopUpPlan && (
            <div className="popup-overlay">
              <div className="popup-plan">
                <h2>Planejamento de aulas</h2>
                <h3>Descreva o conteúdo das aulas e selecione os conhecimentos, recursos e estratégias a serem desenvolvidas.
                </h3>
                <div className="dates">
                  <div className="proposta">
                    <label>Data proposta</label>
                    <input type="date" name="" id="" />
                  </div>
                  <div className="final">
                    <label>Data final</label>
                    <input type="date" name="" id="" />
                  </div>
                </div>
                <Multiselect
                  options={options}
                  value={value4}
                  onChange={(o) => setValue4(o)}
                  multiple={true}
                />
                <Multiselect
                  options={options}
                  value={value5}
                  onChange={(o) => setValue5(o)}
                  multiple={true}
                />
                <Multiselect
                  options={options}
                  value={value6}
                  onChange={(o) => setValue6(o)}
                  multiple={true}
                />
                <div className="edit-btns">
                  <button>Salvar</button>
                  <button onClick={() => setShowPopUpPlan(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
