import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddCourse.css";
import { IntroForms } from "../../Components/IntroForms/IntroForms";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AddCourse() {
  // PopUp deletar curso
  const [showPopUpDelete, setShowPopUpDelete] = useState(false);
  const togglePopUpDelete = () => {
    setShowPopUpDelete(!showPopUpDelete);
  };

  return (
    <section className="add-new-course">
      <SubNavbar />
      <div className="title-addcourse" style={{ marginBottom: "5%" }}>
        <IntroForms
          titleText="Adicione um novo curso"
          subtitleText="Todos os campos são obrigatórios"
        />
      </div>

      <div className="select-planne-course">
        <label htmlFor="" className="label-select">
          Selecione um plano de curso
        </label>
        <select
          id="subject"
          className="input-all"
        >
          <option value=""></option>
        </select>
        <h2>* Obs: Para continuar você deve selecionar um plano de curso</h2>
      </div>
      <form action="">
        <div className="form-addcourse">
          <div className="select-add-course" id="objective-select">
            <label htmlFor="" className="label-add-course">
              Objetivo do Curso
            </label>
            <input type="text" disabled />
          </div>
          <div className="select-add-course" id="requirement-select">
            <label htmlFor="" className="label-add-course">
              Requisito de Acesso
            </label>
            <input type="text" disabled />
          </div>
          <div className="select-add-course" id="category-select">
            <label htmlFor="" className="label-add-course">
              Categoria
            </label>
            <input type="text" disabled />
          </div>
          <div className="select-add-course" id="competence-select">
            <label htmlFor="" className="label-add-course">
              Competências Profissionais
            </label>
            <input type="text" disabled />
          </div>
          <div className="select-numbers">
            <div className="select-add-course" id="workload-select">
              <label htmlFor="" className="label-add-course">
                Carga Horária
              </label>
              <input type="text" disabled />
            </div>
            <div className="select-add-course" id="semesters-select">
              <label htmlFor="" className="label-add-course">
                Quantidade de Semestres
              </label>
              <input type="text" disabled />
            </div>
            <div className="select-add-course" id="assigned-select">
              <label htmlFor="" className="label-add-course">
                Turmas Atribuídas
              </label>
              <input type="text" disabled />
            </div>
          </div>
          <div className="subjects-and-hours">
            <h1>Matérias e Horas</h1>
            <div className="subjects-and-hourr">
              <div className="table-grid-hours">
                <div className="forms-grid-hours">
                  <div className="semester-grid">
                    <h2 style={{ marginTop: "5%" }}>1° Semestre</h2>
                    <table className="table-infos-grid">
                      <thead>
                        <tr>
                          <th>Matéria</th>
                          <th>Carga Horária</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="semester-grid">
                    <h2>2° Semestre</h2>
                    <table className="table-infos-grid">
                      <thead>
                        <tr>
                          <th>Matéria</th>
                          <th>Carga Horária</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="semester-grid">
                    <h2>3° Semestre</h2>
                    <table className="table-infos-grid">
                      <thead>
                        <tr>
                          <th>Matéria</th>
                          <th>Carga Horária</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="semester-grid">
                    <h2>4° Semestre</h2>
                    <table className="table-infos-grid">
                      <thead>
                        <tr>
                          <th>Matéria</th>
                          <th>Carga Horária</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons-addcourse">
            <Link to="/planocursoopp">
              Ver plano de curso completo
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                togglePopUpDelete();
              }}
            >
              Excluir curso
            </button>
          </div>
        </div>
      </form>

      {showPopUpDelete && (
        <div className="overlay" onClick={togglePopUpDelete}>
          <div className="message-delete-course">
            <h1>AVISO!</h1>
            <h2>Não foi possível excluir o curso</h2>
            <h3>
              Existem <span style={{color: "var(--blue-one)", fontWeight: "bold"}}>5</span> turmas atribuídas a ele. Por favor, remova as turmas
              associadas antes de tentar excluir o curso.
            </h3>

            <div className="button-view-class">
              <Link to="/turmaopp">
                Ver minhas turmas
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
