import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/PlanoCursoOpp.css";
import { Clock3, GraduationCap } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function PlanoCursoOpp() {
  return (
    <section className="homeTeacher">
      <NavBarOpp />
      <div className="introTeacher">
        <h1>Gerencie seus planos de curso</h1>
        <h2>crie, edite e exclua os planos de curso disponíveis</h2>
        <hr />
      </div>

      <div className="buttons-class">
        <button>+ Criar um novo plano de curso</button>
      </div>

      <div className="cards-cursosopp">
        <div className="Card-plano">
          <div className="Data-curso">
            <h3 className="Subject">Desenvolvimento de Sistemas</h3>
            <div className="Info">
              <div className="semester-curso">
                <GraduationCap size={22} />
                <h1>4 professores atribuídos</h1>
              </div>
              <div className="Class-curso">
                <Clock3 size={18} />
                <p>4 semestres</p>
              </div>
            </div>
          </div>
          <div className="Arrow">
            <ChevronRight size={50} color="black" strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
