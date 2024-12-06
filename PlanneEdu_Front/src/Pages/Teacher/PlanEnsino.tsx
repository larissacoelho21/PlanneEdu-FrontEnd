import "../../Css/Teacher/PlanEnsino.css";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import { IntroText } from "../../Components/IntroTexts/IntroText";
import { CardPlan } from "../../Components/Box/BoxPlan/BoxPlan";
import { useEffect, useState } from "react";
import { allPlanEns } from "../../Services/Axios";

/* Ícones */
import { GraduationCap, BookMarked } from "lucide-react";

export function PlanEnsino() {
  const [planoEns, setPlanosEns] = useState<any[]>([]);

  useEffect(() => {
    const getPlanEns = async () => {
      try {
        const response = await allPlanEns();
        console.log("Resposta da API:", response);
        setPlanosEns(response);
      } catch (error: any) {
        console.error(
          error.message || "Não foi possível carregar os planos de ensino."
        );
      }
    };

    getPlanEns();
  }, []);

  return (
    <main>
      {/* Cabeçalho */}
      <header className="header">
        <NavBarProfessor />
      </header>

      {/* Título principal */}
      <section className="title-planensino" style={{ margin: "5% 0" }}>
        <IntroText
          titleText="Gerencie os planos de ensino"
          subtitleText="Gerencie e compartilhe seus planos de ensino"
        />
      </section>

      {/* Subtítulo */}
      <section className="title-plans-available">
        <h2>Planos de ensino disponíveis</h2>
      </section>
      

      {/* Planos dinâmicos */}
        {planoEns.map((plano, index) => (
          <CardPlan
            key={index}
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
    </main>
  );
}