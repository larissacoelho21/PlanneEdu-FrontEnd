import "../../Css/Teacher/PlanEnsino.css";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";

/* importando icones para a construção da página */
import { ChevronRight } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { BookMarked } from "lucide-react";
import { Plus } from "lucide-react";
import { CodeXml } from "lucide-react";

export function PlanEnsinoEspc() {
  return (
    <main>
      <div className="header">
        <NavBarProfessor />
      </div>
      <div className="Intro">
        <h1 className="Title">Gerencie os planos de ensino</h1>
        <h2 className="Description">De Desenvolvimento de Sistemas</h2>
        <div className="Line"></div>
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
              <h3 className="Subject">Programação WEB Front-End</h3>
              <div className="tag-course">
                <CodeXml size={20} color="white" />
                <p>Desenvolvimento de Sistemas</p>
              </div>
              <div className="Info">
                <div className="Teacher">
                  <GraduationCap size={25} color="black" strokeWidth={2} />
                  <p>Arthur Rosa</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={2} />
                  <p>Manhã 2023</p>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>

          <div className="Card">
            <div className="Data">
              <h3 className="Subject">Interfaces para dispositivos móveis</h3>
              <div className="tag-course">
                <CodeXml size={20} color="white" />
                <p>Desenvolvimento de Sistemas</p>
              </div>
              <div className="Info">
                <div className="Teacher">
                  <GraduationCap size={25} color="black" strokeWidth={2} />
                  <p>José Roberto</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={2} />
                  <p>Noite 2023</p>
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
