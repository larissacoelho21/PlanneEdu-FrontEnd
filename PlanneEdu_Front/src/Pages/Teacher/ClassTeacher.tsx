import "../../Css/Teacher/ClassTeacher.css";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";
import { Clock3, Users } from "lucide-react";
import { Popup } from "../../Components/PopUpClass/PopUp";
import { LargeButton } from "../../Components/LargeButton/LargeButton";

export function ClassTeacher() {
  const [showPopUp1, setShowPopUp1] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);

  const togglePopUp1 = () => setShowPopUp1(!showPopUp1);
  const togglePopUp2 = () => setShowPopUp2(!showPopUp2);

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

      <div className="selecioneClass">
        <p>Selecione o que deseja visualizar:</p>
      </div>

      <div className="buttons-class">
        <LargeButton
          text="Plano de Ensino"
          onClick={togglePopUp1}
        />
        <LargeButton
          text="Situação de Aprendizagem"
          onClick={togglePopUp2}
        />
        <button id="buttonSA1" onClick={togglePopUp2}>S.A</button>
      </div>

      {/* Popup para Plano de Ensino */}
      {showPopUp1 && (
        <Popup
          title="Plano de Ensino"
          viewLink="/plansensino"
          viewText="Visualizar planos"
          addLink="/addplans"
          addText="Adicionar plano"
          onClose={togglePopUp1}
        />
      )}

      {/* Popup para Situação de Aprendizagem */}
      {showPopUp2 && (
        <Popup
          title="Situação de Aprendizagem"
          viewLink="/visualizaratvd"
          viewText="Visualizar atividades"
          addLink="/addatividade"
          addText="Adicionar atividade"
          onClose={togglePopUp2}
        />
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
