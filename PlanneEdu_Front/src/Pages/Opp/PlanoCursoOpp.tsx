import { useEffect, useState } from "react";
import { IntroText } from "../../Components/IntroTexts/IntroText";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/PlanoCursoOpp.css";
import { Clock3, GraduationCap } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { allPlanCourse } from "../../Services/Axios";

export function PlanoCursoOpp() {
  const [planosCurso, setPlanosCurso] = useState<any[]>([]);

  useEffect(() => {
    const getPlanCourse = async () => {
      try {
        const response = await allPlanCourse();
        console.log("Resposta da API:", response);
        setPlanosCurso(response);
      } catch (error: any) {
        throw new Error(
          error.message || "Não foi possível encontrar os usuários"
        );
      }
    };

    getPlanCourse();
  }, []);

  return (
    <section className="homeTeacher">
      <NavBarOpp />
      <div className="title-plancourseopp">
        <IntroText
          titleText="Gerencie seus planos de curso"
          subtitleText="crie, edite e exclua os planos de curso disponíveis"
        />
      </div>

      <div className="buttons-class" id="buttons-class">
        <a href="/addplancurso">
          <button>+ Criar um novo plano de curso</button>
        </a>
      </div>

      <div className="cards-cursosopp">
        <div className="card-plano">
          {planosCurso.map((curso: any) => (
            <div className="data-curso">
              <h3 className="subject">{curso.nome}</h3>
              <div className="infos-course">
                <div className="semester-curso">
                  <GraduationCap className="chapeu" size={22} />
                  <h1>{curso.categoria}</h1>
                </div>
                <div className="qntd-semester">
                  <Clock3 size={18} />
                  <h1>{curso.qtdSemestre} semestres</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}