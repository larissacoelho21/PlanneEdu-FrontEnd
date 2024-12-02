import "../../Css/Teacher/ClassTeacher.css";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";
import { Popup } from "../../Components/PopUpClass/PopUp";
import { LargeButton } from "../../Components/LargeButton/LargeButton";
import { InfoClass } from "../../Components/Box/InfoClass/InfoClass";

export function ClassTeacher() {
  const [showPopUpPlane, setShowPopUpPlane] = useState(false);
  const [showPopUpSA, setShowPopUpSA] = useState(false);

  const togglePopUpPlanne = () => setShowPopUpPlane(!showPopUpPlane);
  const togglePopUpSA = () => setShowPopUpSA(!showPopUpSA);

  return (
    <section className="class-teacher">
      <div className="subnavbar-class">
        <SubNavbar />
      </div>

      <InfoClass
        course="Desenvolvimento de sistemas"
        classCard="SESI"
        yearClass="2023"
        dateI="23/02/2023"
        dateT="18/12/2024"
        semester={4}
        students="35"
      />

      <div className="selecione-class">
        <p>Selecione o que deseja visualizar:</p>
      </div>

      <div className="buttons-class">
        <LargeButton text="Plano de Ensino" onClick={togglePopUpPlanne} />
        <LargeButton text="Situação de Aprendizagem" onClick={togglePopUpSA} />
        <button id="buttonSA1" onClick={togglePopUpSA}>
          S.A
        </button>
      </div>

      {showPopUpPlane && (
        <Popup
          title="Plano de Ensino"
          viewLink="/plansensino"
          viewText="Visualizar planos"
          addLink="/addplans"
          addText="Adicionar plano"
          onClose={togglePopUpPlanne}
        />
      )}

      {showPopUpSA && (
        <Popup
          title="Situação de Aprendizagem"
          viewLink="/visualizaratvd"
          viewText="Visualizar atividades"
          addLink="/addatividade"
          addText="Adicionar atividade"
          onClose={togglePopUpSA}
        />
      )}

      <div className="registration-table">
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
