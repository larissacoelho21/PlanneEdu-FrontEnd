import "../../Css/Teacher/ClassTeacher.css";

import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";

import { useState } from "react";
import { Link } from "react-router-dom";

import { Clock3, Users, Eye } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function ClassTeacher() {
  const [showPopUp1, setShowPopUp1] = useState(false);
  const togglePopUp1 = () => {
    setShowPopUp1(!showPopUp1);
  };

  const [showPopUp2, setShowPopUp2] = useState(false);
  const togglePopUp2 = () => {
    setShowPopUp2(!showPopUp2);
  };

  return (
    <section className="class-teacher">
      <div className="subnavbar-class">
        <SubNavbar />
      </div>

      <div className="box-info-class">
        <h1>Desenvolvimento de Sistemas | SESI 2023</h1>
        <div className="date-badge">
          <span>23/02/2023 — 18/12/2024</span>
        </div>
        <div className="infos-teacher">
          <div className="semester-teacher">
            <Clock3 size={18} />
            <h1>4 semestres</h1>
          </div>
          <div className="students">
            <Users size={18} />
            <h1>35 alunos</h1>
          </div>
        </div>
      </div>

      <div className="buttons-class">
        <button onClick={togglePopUp1}>Plano de Ensino</button>
        <button onClick={togglePopUp2}>Situação de Aprendizagem</button>
      </div>

      {showPopUp1 && (
        <div className="overlay" onClick={togglePopUp1}>
          <div className="popup-planne" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content">
              <h1>Plano de Ensino</h1>
            </div>
            <div className="buttons-action">
              <div className="button-view">
                <Link to="">
                  <FontAwesomeIcon icon={faEye} />
                  <h1>Visualizar planos</h1>
                </Link>
              </div>
              <div className="button-add">
                <Link to="">
                  <FontAwesomeIcon icon={faPlus} />
                  <h1>Adicionar plano</h1>
                </Link>
              </div>
              <div className="button-close">
                <button onClick={togglePopUp1}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopUp2 && (
        <div className="overlay" onClick={togglePopUp2}>
          <div className="popup-planne" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content">
              <h1>Situação de Aprendizagem</h1>
            </div>
            <div className="buttons-action">
              <div className="button-view">
                <Link to="/visualizaratvd">
                  <FontAwesomeIcon icon={faEye} />
                  <h1>Visualizar atividades</h1>
                </Link>
              </div>
              <div className="button-add">
                <Link to="">
                  <FontAwesomeIcon icon={faPlus} />
                  <h1>Adicionar atividade</h1>
                </Link>
              </div>
              <div className="button-close">
                <button onClick={togglePopUp2}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
