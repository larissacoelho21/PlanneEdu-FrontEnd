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
        <div className="card-plan-teaching">
          <div className="title-card-plan">
            <h1>Programação WEB Front-End</h1>
          </div>
          <div className="course-badge">
            <span>Desenvolvimento de sistemas</span>
          </div>
          <div className="infos-box">
            <div className="semester">
              <GraduationCap size={23} color="black" strokeWidth={1.5} />
              <h1>Arthur Rosa</h1>
            </div>
            <div className="student-class">
              <BookMarked size={18} color="black" strokeWidth={1.5} />
              <h1>Integral 2023</h1>
            </div>
          </div>
        </div>

        <div className="card-plan-teaching">
          <div className="title-card-plan">
            <h1>Interfaces para dispositivos móveis</h1>
          </div>
          <div className="course-badge">
            <span>Desenvolvimento de sistemas</span>
          </div>
          <div className="infos-box">
            <div className="semester">
              <GraduationCap size={23} color="black" strokeWidth={1.5} />
              <h1>José Roberto</h1>
            </div>
            <div className="student-class">
              <BookMarked size={18} color="black" strokeWidth={1.5} />
              <h1>Manhã 2023</h1>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
