import "../../Css/Teacher/PlanEnsino.css";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";

/* importando icones para a construção da página */
import { ChevronRight } from "lucide-react";
import { Settings } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { BookMarked } from "lucide-react";
import { ChartLine } from "lucide-react";
import { IntroText } from "../../Components/IntroTexts/IntroText";
import { CardPlan } from "../../Components/Box/BoxPlan/BoxPlan";

export function PlanEnsino() {
  return (
    <main>
      <div className="header">
        <NavBarProfessor />
      </div>
      <div className="title-planensino" style={{ margin: "5% 0 5% 0" }}>
        <IntroText
          titleText="Gerencie os planos de ensino"
          subtitleText="Gerencie e compartilhe seus planos de ensino"
        />
      </div>

      <div className="title-plans-available">
        <h2>Planos de ensino disponíveis</h2>
      </div>

      <div className="cards-plans">
        <CardPlan
          matter="Programação e Controle de Suprimentos"
          course="Logística"
          iconTeacher={
            <GraduationCap size={23} color="black" strokeWidth={1.5} />
          }
          teacher="Samanta Neves"
          iconClass={<BookMarked size={18} color="black" strokeWidth={1.5} />}
          shiftCourse="Manhã"
          yearCourse="2023"
        />

        <CardPlan
          matter="Automação Industrial"
          course="Eletromecânica"
          iconTeacher={
            <GraduationCap size={23} color="black" strokeWidth={1.5} />
          }
          teacher="André Pereira"
          iconClass={<BookMarked size={18} color="black" strokeWidth={1.5} />}
          shiftCourse="Manhã"
          yearCourse="2023"
        />
      </div>
    </main>
  );
}
