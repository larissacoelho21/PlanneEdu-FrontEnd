import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntroForms } from "../../Components/IntroForms/IntroForms";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddClass.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(!!value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value !== "");
    if (onChange) onChange(event); // Para encaminhar a mudança do valor
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="label-add" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-add"
        id={id}
        type={type}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </fieldset>
  );
}

export function AddClass() {
  const [showPopUpStudent, setShowPopUpStudent] = useState(false);

  const togglePopUpStudent = () => setShowPopUpStudent(!showPopUpStudent);

  return (
    <section className="add-new-class">
      <SubNavbar />

      <div className="title-addclass" style={{ marginBottom: "5%" }}>
        <IntroForms
          titleText="Adicione uma nova turma"
          subtitleText="Todos os campos são obrigatórios"
        />
      </div>

      <form action="">
        <div className="form-addclass">
          <div className="select-addclass">
            <label htmlFor="" className="label-select">
              Selecione o curso
            </label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
          <div className="input-addclass">
            <InputField
              id="nameclass"
              label="Nome da turma"
              type="text"
            />
          </div>
          <div className="select-addclass">
            <label htmlFor="" className="label-select">
              Selecione o turno
            </label>
            <select name="" id="">
              <option value=""></option>
              <option value="">Matutino</option>
              <option value="">Vespertino</option>
              <option value="">Noturno</option>
              <option value="">Integral</option>
            </select>
          </div>
          <div className="dates-add">
            <div className="proposed-date">
              <label htmlFor="" className="label-date">
                Data de início
              </label>
              <input type="date" name="dataInicio" />
            </div>
            <div className="delivery-date">
              <label htmlFor="" className="label-date">
                Data de término
              </label>
              <input type="date" name="dataTermino" />
            </div>
          </div>

          <div className="list-students">
            <div className="title-add-student">
              <h1>Lista de alunos</h1>
            </div>
            <div className="add-student">
              <h1>Clique para adicionar</h1>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  togglePopUpStudent();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          {showPopUpStudent && (
            <div className="overlay" onClick={togglePopUpStudent}>
              <div className="popup-add-student" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content-student">
                  <div className="texts-student">
                    <h1>Adicione um aluno a esta turma</h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="timetable-class">
            <div className="title-add-class">
              <h1>Grade horária</h1>
            </div>
            <div className="add-timetable">
            <h2 style={{ marginTop: "5%" }}>1° Semestre</h2>
              <table className="table-timetable">
                <thead>
                  <tr>
                    <th>Matéria</th>
                    <th>Professor</th>
                    <th>Carga Horária</th>  
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fundamentos de Programação Orientada a Objeto</td>
                    <td><button><FontAwesomeIcon icon={faPlus} /></button></td>
                    <td>75</td>
                  </tr>
                  <tr>
                    <td>Sistemas Operacionais</td>
                    <td><button><FontAwesomeIcon icon={faPlus} /></button></td>
                    <td>75</td>
                  </tr>
                  <tr>
                    <td>Hardware e Redes</td>
                    <td><button><FontAwesomeIcon icon={faPlus} /></button></td>
                    <td>75</td>
                  </tr>
                  <tr>
                    <td>Linguagem de Marcação</td>
                    <td><button><FontAwesomeIcon icon={faPlus} /></button></td>
                    <td>75</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
