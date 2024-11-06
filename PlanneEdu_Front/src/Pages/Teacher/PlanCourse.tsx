import { Clock3 } from "lucide-react";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import { FilterCategory } from "../../Components/FilterCategory/FilterCategory";
import "../../Css/Teacher/PlanCourse.css";
import { IntroText } from "../../Components/IntroTexts/IntroText";

export function PlanCourse() {
  return (
    <section className="plancourseteacher">
      <div className="navbar-placourse">
        <NavBarProfessor />
      </div>

      <div className="title-plancourse" style={{marginTop: "5%"}}>
        <IntroText
          titleText="Planos de Curso"
          subtitleText="Visualize os planos de curso disponíveis "
        />
      </div>

      <div className="filter-plancourse">
        <FilterCategory />
      </div>
      <div className="cards-planscourses">
        <div className="box-teacher-plancourse">
          <h1>Desenvolvimento de sistemas</h1>
          <div className="semesterCourse">
            <Clock3 size={20} />
            <span>4 semestres</span>
          </div>
          <div className="categoryBadge">
            <span>Informação e Comunicação</span>
          </div>
          <div className="dowload-pdf">
            <span>Clique aqui e baixe o PDF</span>
          </div>    
        </div>

        <div className="box-teacher-plancourse">
          <h1>Eletromecânica</h1>
          <div className="semesterCourse">
            <Clock3 size={18} />
            <span>4 semestres</span>
          </div>
          <div className="categoryBadge">
            <span>Controle e Processos Industriais</span>
          </div>
          <div className="dowload-pdf">
            <span>Clique aqui e baixe o PDF</span>
          </div>
        </div>
      </div>
    </section>
  );
}
