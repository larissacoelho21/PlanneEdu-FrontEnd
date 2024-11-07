import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddCourse.css";
import { IntroForms } from "../../Components/IntroForms/IntroForms";
import { useState } from "react";
import { TableSubjects } from "../../Components/TableSubjects/TableSubjects";

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
            <TableSubjects
              semesterTable={1}
              subjectTable="PIpi"
              workloadTable={75}
              subjectTable2="d"
              workloadTable2={34}
            />
          </div>

        </div>
      </form>
    </section>
  );
}
