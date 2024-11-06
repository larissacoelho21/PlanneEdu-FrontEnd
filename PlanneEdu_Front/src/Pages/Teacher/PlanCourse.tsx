import { Clock3 } from "lucide-react";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import { FilterCategory } from "../../Components/FilterCategory/FilterCategory";
import "../../Css/Teacher/PlanCourse.css";

export function PlanCourse() {
  return (
    <section className="plancourseteacher">
      <div className="navbar-placourse">
        <NavBarProfessor />
      </div>

      <div className="introTeacher" style={{ marginTop: "5%" }}>
        <h1>Planos de curso</h1>
        <h2>Visualize os planos de curso disponíveis </h2>
        <hr />
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
