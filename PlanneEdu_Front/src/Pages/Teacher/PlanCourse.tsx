import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import { FilterCategory } from "../../Components/FilterCategory/FilterCategory";
import "../../Css/Teacher/PlanCourse.css";

export function PlanCourse() {
  return (
    <section className="plancourseteacher">
      <div className="navbar-placourse">
        <NavBarProfessor />
      </div>

      <div className="introTeacher" style={{marginTop: "5%"}}>
        <h1>Planos de curso</h1>
        <h2>Visualize os planos de curso disponíveis </h2>
        <hr />
      </div>

      <div className="filter-plancourse">
        <FilterCategory/>
      </div>
    </section>
  );
}
