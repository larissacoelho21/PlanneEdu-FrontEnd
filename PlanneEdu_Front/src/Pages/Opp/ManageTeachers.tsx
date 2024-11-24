import { IntroText } from "../../Components/IntroTexts/IntroText";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/ManageTeachers.css";
import { Lock } from 'lucide-react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Trash } from 'lucide-react';
import { FilterCategory } from "../../Components/FilterCategory/FilterCategory";

export function ManageTeachers() {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className="homeTeacher">
      <NavBarOpp />
      <div className="title-plancourseopp">
        <IntroText
          titleText="Gerencie os docentes"
          subtitleText="Visualize suas principais informações"
        />
      </div>

      <div className="buttons-class">
        <a href="/addUser"><button>+ Adicionar um novo docente</button></a>
      </div>
      <FilterCategory/>

      <div className="teacher-card">
        <div className="teacher-card2">
          <h1>Arthur Rosa</h1>
          <div className="lock">
            <Lock size={19} strokeWidth={1.5} /> <p>NIF: 128492220</p>
            <div className="chevron-container" onClick={toggleExpand} style={{ cursor: "pointer" }}>
              {isExpanded ? (
                <ChevronUp size={40} color="black" strokeWidth={1} />
              ) : (
                <ChevronDown size={40} color="black" strokeWidth={1} />
              )}
            </div>
          </div>
          <div className="teacher-development">
            <span>Desenvolvimento de sistemas</span>
          </div>
        </div>


        {/* Conteúdo adicional */}
        {isExpanded && (
          <div className={`additional-info ${isExpanded ? "expanded" : "collapsed"}`}>
            <h2>Turmas Atribuídas</h2>
            <ul className="a">
              <li>DEV SESI - 2023</li>
              <li>DEV Noite - 2023</li>
              <li>Libbs</li>
              <li>DS SESI - 2024</li>
              <li>DS Noite - 2024</li>
            </ul>

            <h2>Matérias</h2>
            <ul className="a">
              <li>Banco de Dados</li>
              <li>Programação Orientada a Objetos</li>
              <li>Programação BackEnd</li>
            </ul>

            <h2>Informações de contato</h2>
            <div className="email-manage">
              <Mail size={18} color="black" strokeWidth={1} />
              <p>arthur.rosa@gmail.com</p>
            </div>
            <div className="phone-manage">
              <Phone size={18} color="black" strokeWidth={1} />
              <p>11 97391-0399</p>
            </div>

            <div className="button-manage">
              <button>
                <span className="changeColor">
                  <Trash size={25} color="black" strokeWidth={1.5} />
                </span>
                <span className="delete-manage">Excluir docente</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}