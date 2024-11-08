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
            <input type="text" disabled />
          </div>
          <div className="select-add-course" id="requirement-select">
            <label htmlFor="" className="label-select">
              Requisito de Acesso
            </label>
            <input type="text" disabled />
          </div>
          <div className="select-add-course" id="category-select">
            <label htmlFor="" className="label-select">
              Categoria
            </label>
            <input type="text" disabled />
          </div>
          <div className="select-add-course" id="competence-select">
            <label htmlFor="" className="label-select">
              Competências Profissionais
            </label>
            <input type="text" disabled />
          </div>
          <div className="select-numbers">
            <div className="select-add-course" id="workload-select">
              <label htmlFor="" className="label-select">
                Carga Horária
              </label>
              <input type="text" disabled />
            </div>
            <div className="select-add-course" id="semesters-select">
              <label htmlFor="" className="label-select">
                Quantidade de Semestres
              </label>
              <input type="text" disabled />
            </div>
            <div className="select-add-course" id="assigned-select">
              <label htmlFor="" className="label-select">
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
                          <td>Fundamentos de Programação Orientada a Objeto</td>
                          <td>75</td>
                        </tr>
                        <tr>
                          <td>Sistemas Operacionais</td>
                          <td>75</td>
                        </tr>
                        <tr>
                          <td>Hardware e Redes</td>
                          <td>75</td>
                        </tr>
                        <tr>
                          <td>Linguagem de Marcação</td>
                          <td>75</td>
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
                          <td>Fundamentos de Programação Orientada a Objeto</td>
                          <td>100</td>
                        </tr>
                        <tr>
                          <td>Programação Web Front-End</td>
                          <td>75</td>
                        </tr>
                        <tr>
                          <td>Programação Web Back-End</td>
                          <td>125</td>
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
                          <td>Banco de Dados</td>
                          <td>75</td>
                        </tr>
                        <tr>
                          <td>Programação Web Back-End</td>
                          <td>50</td>
                        </tr>
                        <tr>
                          <td>Interface para Dispositivos Móveis</td>
                          <td>75</td>
                        </tr>
                        <tr>
                          <td>Programação para Dispositivos Móveis</td>
                          <td>100</td>
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
                          <td>Requisitos e Modelagem de Software</td>
                          <td>45</td>
                        </tr>
                        <tr>
                          <td>Testes de Software</td>
                          <td>30</td>
                        </tr>
                        <tr>
                          <td>Projetos</td>
                          <td>225</td>
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
              <Link to="/cursosopp">
                Ver minhas turmas
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
