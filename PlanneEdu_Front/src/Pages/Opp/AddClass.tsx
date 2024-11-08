import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntroForms } from "../../Components/IntroForms/IntroForms";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddClass.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function AddClass() {

    const [showPopUpStudent, setShowPopUpStudent] = useState(false);
    


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
            <label htmlFor="" className="label-select">
              Nome da turma
            </label>
            <input type="text" name="" id="" />
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
              <input
                type="date"
                name="dataInicio"
              />
            </div>
            <div className="delivery-date">
              <label htmlFor="" className="label-date">
                Data de término
              </label>
              <input
                type="date"
                name="dataTermino"
              />
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
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
