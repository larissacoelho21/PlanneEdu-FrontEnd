import { useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddCourse.css";
import { Link } from "react-router-dom";

export function AddCourse() {
  // Estados
  type TableData = {
    subject: string;
    hours: string;
    semester: string;
  };

  const [textInput, setTextInput] = useState<string>("");
  const [hoursInput, setHoursInput] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const [semestersData, setSemestersData] = useState<{
    [key: string]: TableData[];
  }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingSemester, setEditingSemester] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const selectOptions = [
    "1º Semestre",
    "2º Semestre",
    "3º Semestre",
    "4º Semestre",
  ];

  const selectMatter = ["Programação BackEnd", "Projetos", "Requisitos"];

  const selectWorkload = ["90", "75", "45", "35", "20"];

  // Funções
  const addData = () => {
    if (textInput && hoursInput && selectedOption) {
      const newData: TableData = {
        subject: textInput,
        hours: hoursInput,
        semester: selectedOption,
      };

      setSemestersData((prevData) => ({
        ...prevData,
        [selectedOption]: [...(prevData[selectedOption] || []), newData],
      }));

      setTextInput("");
      setHoursInput("");
      setSelectedOption("");
    }
  };

  const SaveEdit = () => {
    if (editingIndex !== null && editingSemester) {
      if (editingSemester !== selectedOption) {
        const updatedPreviousSemesterData = semestersData[
          editingSemester
        ].filter((_, i) => i !== editingIndex);

        const newData: TableData = {
          subject: textInput,
          hours: hoursInput,
          semester: selectedOption,
        };

        setSemestersData((prevData) => ({
          ...prevData,
          [editingSemester]: updatedPreviousSemesterData,
          [selectedOption]: [...(prevData[selectedOption] || []), newData],
        }));
      } else {
        const updatedData = [...(semestersData[editingSemester] || [])];
        updatedData[editingIndex] = {
          subject: textInput,
          hours: hoursInput,
          semester: selectedOption,
        };

        setSemestersData((prevData) => ({
          ...prevData,
          [editingSemester]: updatedData,
        }));
      }

      resetEditState();
    }
  };

  const resetEditState = () => {
    setIsEditing(false);
    setTextInput("");
    setHoursInput("");
    setSelectedOption("");
    setEditingIndex(null);
    setEditingSemester(null);
    setShowPopUpEdit(false);
  };

  const DeleteData = (semester: string, index: number) => {
    const updatedData = semestersData[semester].filter((_, i) => i !== index);

    // Se não houver mais dados no semestre, remova o semestre do objeto.
    if (updatedData.length === 0) {
      const { [semester]: _, ...rest } = semestersData; // Remove o semestre do objeto
      setSemestersData(rest);
    } else {
      setSemestersData((prevData) => ({
        ...prevData,
        [semester]: updatedData,
      }));
    }
  };

  // PopUp de edição
  const [showPopUpEdit, setShowPopUpEdit] = useState(false);
  const togglePopUpEdit = () => {
    setShowPopUpEdit(!showPopUpEdit);
  };

  // PopUp deletar curso
  const [showPopUpDelete, setShowPopUpDelete] = useState(false);
  const togglePopUpDelete = () => {
    setShowPopUpDelete(!showPopUpDelete);
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
                  <label className="label-select">Selecione o Semestre</label>
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

                <div className="grid-table">
                  <label className="label-select">Matéria</label>
                  <select
                    className="matter"
                    id="matter-grid"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                  >
                    <option value="" disabled></option>
                    {selectMatter.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid-table">
                  <label className="label-select">Carga Horária</label>
                  <select
                    className="hours"
                    id="hours-grid"
                    value={hoursInput}
                    onChange={(e) => setHoursInput(e.target.value)}
                  >
                    <option value="" disabled></option>
                    {selectWorkload.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="add-table"
                  onClick={(e) => {
                    e.preventDefault();
                    addData();
                  }}
                  disabled={!selectMatter || !selectedOption || !selectWorkload}
                >
                  Adicionar à Tabela
                </button>
              </div>

              {/* Tabela para exibir os dados */}
              {Object.keys(semestersData)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map((semester) => (
                  <div key={semester} className="semester-grid">
                    <h2>{semester}</h2>
                    <table className="table-infos-grid">
                      <thead>
                        <tr>
                          <th>Matéria</th>
                          <th>Carga Horária</th>
                          <th>Editar</th>
                          <th>Deletar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semestersData[semester].map((data, index) => (
                          <tr key={index}>
                            <td>{data.subject}</td>
                            <td>{data.hours}</td>
                            <td>
                              <button
                                className="action-btn-course"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditingIndex(index);
                                  setEditingSemester(semester);
                                  setTextInput(data.subject);
                                  setHoursInput(data.hours);
                                  setSelectedOption(semester);
                                  setShowPopUpEdit(true);
                                }}
                              >
                                Editar
                              </button>
                            </td>
                            <td>
                              <button
                                className="action-btn-course"
                                onClick={() => DeleteData(semester, index)}
                              >
                                Deletar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}

              {/* PopUp de edição */}
              {showPopUpEdit && (
                <div className="popup-overlay" onClick={togglePopUpEdit}>
                  <div
                    className="popup-edit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2>Editar Matéria</h2>
                    <div className="inputs-edit">
                      <div className="edit-semester">
                        <label>Semestre</label>
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
                      <div className="edit-matter">
                        <label>Matéria</label>
                        <select
                          className="matter"
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                        >
                          <option value=""></option>
                          {selectMatter.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="edit-workload">
                        <label>Carga Horária</label>
                        <select
                          className="hours"
                          value={hoursInput}
                          onChange={(e) => setHoursInput(e.target.value)}
                        >
                          <option value=""></option>
                          {selectWorkload.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      className="save-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        SaveEdit();
                      }}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
