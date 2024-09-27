import { useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddCourse.css";

export function AddCourse() {
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
  const selectOptions = [1, 2, 3, 4];

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
      setShowPopUpEdit(false);
    }
  };

  const DeleteData = (index: number) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  const [showPopUpEdit, setShowPopUpEdit] = useState(false);
  const togglePopUpEdit = () => {
    setShowPopUpEdit(!showPopUpEdit);
  };
  return (
    <section className="add-new-course">
      <SubNavbar />

      <div className="introduction-course">
        <h1>Adicione um novo curso</h1>
        <h2>Todos os campos são obrigatórios</h2>
      </div>

      <div className="select-planne-course">
        <label htmlFor="" className="label-select">
          Selecione um plano de curso
        </label>
        <select name="" id="">
          <option value=""></option>
        </select>
        <h2>
          * Obs: Para criar um curso você deve selecionar um plano de curso
        </h2>
      </div>

      <form action="">
        <div className="form-addcourse">
          <div className="select-add-course" id="objective-select">
            <label htmlFor="" className="label-select">
              Objetivo do Curso
            </label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>

          <div className="select-add-course" id="requirement-select">
            <label htmlFor="" className="label-select">
              Requisito de Acesso
            </label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>

          <div className="select-add-course" id="category-select">
            <label htmlFor="" className="label-select">
              Categoria
            </label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>

          <div className="select-add-course" id="competence-select">
            <label htmlFor="" className="label-select">
              Competências Profissionais
            </label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>

          <div className="select-numbers">
            <div className="select-add-course" id="workload-select">
              <label htmlFor="" className="label-select">
                Carga Horária
              </label>
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>

            <div className="select-add-course" id="semesters-select">
              <label htmlFor="" className="label-select">
                Quantidade de Semestres
              </label>
              <select name="" id="">
                <option value=""></option>
              </select>
            </div>

            <div className="select-add-course" id="assigned-select">
              <label htmlFor="" className="label-select">
                Turmas Atribuídas
              </label>
              <select name="" id="" disabled style={{ appearance: "none" }}>
                <option value=""></option>
              </select>
            </div>
          </div>

          <div className="subjects-and-hours">
            <h1>Matérias e Horas</h1>

            <div className="table-grid-hours">
              <div className="forms-grid-hours">
                <div className="select-semester-grid">
                  <label style={{ color: "var(--gray-one)" }}>
                    Selecione o Semestre
                  </label>
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
                <div className="matter-grid-table">
                  <label style={{ color: "var(--gray-one)" }}>Matéria</label>
                  <input
                    type="text"
                    name="matter"
                    id="matter-grid"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </div>
                <div className="matter-grid-table">
                  <label style={{ color: "var(--gray-one)" }}>Carga Horária</label>
                  <input
                    type="text"
                    name="matter"
                    id="matter-grid"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  />
                </div>

                <button
                  className="add-table"
                  onClick={(e) => {
                    e.preventDefault(); 
                    addData();
                  }}
                >
                  Adicionar à Tabela
                </button>
              </div>

              <table className="table-infos-grid">
                <thead>
                  <tr>
                    <th>Semestre</th>
                    <th>Matéria</th>
                    <th>Carga Horária</th>
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
                          onClick={(e) => {
                            setEditingIndex(index);
                            setTextInput(data.text);
                            setSelectedOption(data.selectedOption);
                            setShowPopUpEdit(true);
                            e.preventDefault(); 
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

              {showPopUpEdit && (
                <div className="popup-overlay">
                  <div className="popup-edit">
                    <h2>Editar</h2>
                    <div className="inputt">
                      <label>Matéria</label>
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
                      <button onClick={() => setShowPopUpEdit(false)}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="buttons-save-atvd">
            <button>Salvar Alterações</button>
            <button>Voltar</button>
          </div>
        </div>
      </form>
    </section>
  );
}
