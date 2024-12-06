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
import { useEffect, useState } from "react";
import { allPlanEns } from "../../Services/Axios";

import { ButtonToAdd } from "../../Components/Buttons/Add/ToAdd";

export function PlanEnsino() {
  const [planoEns, setPlanosEns] = useState<any[]>([]);

  useEffect(() => {
    const getPlanEns = async () => {
      try {
        const response = await allPlanEns();
        console.log("Resposta da API:", response);
        setPlanosEns(response);
      } catch (error: any) {
        throw new Error(
          error.message || "Não foi possível encontrar os usuários"
        );
      }
    };

    getPlanEns();
  }, []);

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


      <div className="cards-plans-teaching">
        <div className="card-plan-teaching">
          <div className="title-card-plan">
            <h1>Programação e Controle de Suprimentos</h1>
          </div>
          <div className="course-badge">
            <span>Logística</span>
          </div>
          <div className="infos-box">
            <div className="semester">
              <GraduationCap size={23} color="black" strokeWidth={1.5} />
              <h1>Samanta Neves</h1>
            </div>
            <div className="student-class">
              <BookMarked size={18} color="black" strokeWidth={1.5} />
              <h1>Manhã 2023</h1>
            </div>
          </div>
        </div>

        <div className="card-plan-teaching">
          <div className="title-card-plan">
            <h1>Automação Industrial</h1>
          </div>
          <div className="course-badge">
            <span>Eletromecânica</span>
          </div>
          <div className="infos-box">
            <div className="semester">
              <GraduationCap size={23} color="black" strokeWidth={1.5} />
              <h1>André Pereira</h1>
            </div>
            <div className="student-class">
              <BookMarked size={18} color="black" strokeWidth={1.5} />
              <h1>Manhã 2023</h1>
            </div>
          </div>
        </div>
      <div className="cards-plans">
        {planoEns.map((plano) => (
          <CardPlan
            matter={plano.materia}
            course={plano.curso}
            iconTeacher={
              <GraduationCap size={23} color="black" strokeWidth={1.5} />
            }
            teacher={plano.professor}
            iconClass={<BookMarked size={18} color="black" strokeWidth={1.5} />}
            shiftCourse={plano.turma}
          />
        ))}


        {/* <CardPlan
          matter="Automação Industrial"
          course="Eletromecânica"
          iconTeacher={
            <GraduationCap size={23} color="black" strokeWidth={1.5} />
          }
          teacher="André Pereira"
          iconClass={<BookMarked size={18} color="black" strokeWidth={1.5} />}
          shiftCourse="Manhã"
          yearCourse="2023"
        /> */}

      </div>
    </main>
  );
}
