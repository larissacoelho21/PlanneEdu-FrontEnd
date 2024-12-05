import "../../Css/Teacher/PlanEnsino.css";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";

/* importando icones para a construção da página */
import { ChevronRight } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { BookMarked } from "lucide-react";
import { Plus } from "lucide-react";
import { CodeXml } from "lucide-react";
import { IntroForms } from "../../Components/IntroForms/IntroForms";
import { IntroText } from "../../Components/IntroTexts/IntroText";

export function PlanEnsinoEspc() {
  return (
    <main>
      <div className="header" style={{marginBottom: "5%"}}>
        <NavBarProfessor />
      </div>
      <IntroText
        titleText="Gerencie os planos de ensino"
        subtitleText="De Desenvolvimento de Sistemas"
      />

      <div className="title-plans-available">
        <h2>Planos de ensino disponíveis</h2>
        </div>
        <div className="cards-plans-teaching">
          <div className="card-plan">
            <div className="infos-card">
              <h3 className="subject">Programação WEB Front-End</h3>
              <div className="course-tag">
                <p>Desenvolvimento de Sistemas</p>
              </div>
              <div className="info-class">
                <div className="teacher">
                  <GraduationCap size={25} color="black" strokeWidth={2} />
                  <p>Arthur Rosa</p>
                </div>
                <div className="class">
                  <BookMarked size={21} color="black" strokeWidth={2} />
                  <p>Manhã 2023</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-plan">
            <div className="infos-card">
              <h3 className="subject">Interfaces para dispositivos móveis</h3>
              <div className="course-tag">
                <p>Desenvolvimento de Sistemas</p>
              </div>
              <div className="info-class">
                <div className="teacher">
                  <GraduationCap size={25} color="black" strokeWidth={2} />
                  <p>José Roberto</p>
                </div>
                <div className="class">
                  <BookMarked size={21} color="black" strokeWidth={2} />
                  <p>Noite 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </main>
  );
}
