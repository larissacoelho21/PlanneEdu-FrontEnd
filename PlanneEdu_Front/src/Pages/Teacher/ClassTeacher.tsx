import "../../Css/Teacher/ClassTeacher.css";

import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";

import { useState } from "react";
import { Link } from "react-router-dom";

import { Clock3, Users } from "lucide-react";
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
                <Link to="/addatividade">
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

      <div className="registrationTable">
        <table className="table">
          <thead>
            <tr className="title-info">
              <th></th>
              <th id="title-name">Nome</th>
              <th>Matrícula</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="number">1</td>
              <td id="name">Ana Costa Santos</td>
              <td id="number">25780</td>
            </tr>
            <tr>
              <td id="number">2</td>
              <td id="name">Brenda Almeida da Silva</td>
              <td id="number">25957</td>
            </tr>
            <tr>
              <td id="number">3</td>
              <td id="name">Julia Rodrigues Cunha</td>
              <td id="number">25762</td>
            </tr>
            <tr>
              <td id="number">4</td>
              <td id="name">Kauã Castro Cavalcanti</td>
              <td id="number">25893</td>
            </tr>
            <tr>
              <td id="number">5</td>
              <td id="name">Marisa Silva Barbosa</td>
              <td id="number">25866</td>
            </tr>
            <tr>
              <td id="number">6</td>
              <td id="name">Martim Costa Cardoso</td>
              <td id="number">25031</td>
            </tr>
            <tr>
              <td id="number">7</td>
              <td id="name">Tomás Carvalho Pinto</td>
              <td id="number">25114</td>
            </tr>
            <tr>
              <td id="number">8</td>
              <td id="name">Olivía Bernardes Oliveira</td>
              <td id="number">25490</td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>
  );
}
