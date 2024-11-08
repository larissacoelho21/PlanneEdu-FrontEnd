import "../../Css/Teacher/PlanEnsino.css";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";

/* importando icones para a construção da página */
import { ChevronRight } from "lucide-react";
import { Settings } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { BookMarked } from "lucide-react";
import { ChartLine } from "lucide-react";
import { Plus } from "lucide-react";
import { IntroText } from "../../Components/IntroTexts/IntroText";

export function PlanEnsino() {
  return (
    <main>
      <div className="header">
        <NavBarProfessor />
      </div>
      <div className="title-planensino" style={{margin: "5% 0 5% 0"}}>
        <IntroText
          titleText="Gerencie os planos de ensino"
          subtitleText="Gerencie e compartilhe seus planos de ensino"
        />
      </div>

      <div className="Add-Plano">
        <button>
          <i>
            <Plus size={32} color="white" strokeWidth={1.5} />
          </i>{" "}
          Adicionar plano de ensino
        </button>
      </div>

      <div className="Planos">
        <h2>Planos de ensino disponíveis</h2>
        <div className="Cards">
          <div className="Card">
            <div className="Data">
              <h3 className="Subject">Automação Industrial</h3>
              <div className="tag-course">
                <Settings size={20} color="white" />
                <p>Eletromecânica</p>
              </div>
              <div className="Info">
                <div className="Teacher">
                  <GraduationCap size={25} color="black" strokeWidth={1.5} />
                  <p>André Souza</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={1.5} />
                  <p>Noite 2023</p>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>

          <div className="Card">
            <div className="Data">
              <h3 className="Subject">Programação e Controle de Suprimentos</h3>
              <div className="tag-course">
                <ChartLine size={20} color="white" />
                <p>Logística</p>
              </div>
              <div className="Info">
                <div className="Teacher">
                  <GraduationCap size={25} color="black" strokeWidth={1.5} />
                  <p>Samanta Neves</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={1.5} />
                  <p>Manhã 2023</p>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
