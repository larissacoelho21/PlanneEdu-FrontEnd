import "../../Css/Teacher/PlanEnsino.css";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";

/* importando icones para a construção da página */
import { ChevronRight } from "lucide-react";
import { Settings } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { BookMarked } from "lucide-react";
import { ChartLine } from "lucide-react";
import { Folder } from "lucide-react";
import { Plus } from "lucide-react";
import { CodeXml } from "lucide-react";

export function PlanEnsino() {
  return (
    <main>
      <div className="header">
        <NavBarProfessor />
      </div>
      <div className="Intro">
        <h1 className="Title">Planos de Ensino</h1>
        <h2 className="Description">
          Gerencie e compartilhe seus planos de ensino
        </h2>
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
                  <GraduationCap size={18} color="black" strokeWidth={1.5} />
                  <p>André Souza</p>
                </div>
                <div className="Class">
                  <BookMarked size={18} color="black" strokeWidth={1.5} />
                  <p>Noite 2023</p>
                </div>
              </div>
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
                  <GraduationCap size={18} color="black" strokeWidth={1.5} />
                  <p>Samanta Neves</p>
                </div>
                <div className="Class">
                  <BookMarked size={18} color="black" strokeWidth={1.5} />
                  <p>Manhã 2023</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="Card">
            <div className="Data">
              <h3 className="Subject">Comunicação em Multimeios</h3>
              <div className="tag-course">
                <Folder size={20} color="white" />
                <p>Administração</p>
              </div>
              <div className="Info">
                <div className="Teacher">
                  <GraduationCap size={25} color="black" strokeWidth={1.5} />
                  <p>Maria Silva</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={1.5} />
                  <GraduationCap size={18} color="black" strokeWidth={1.5} />
                  <p>Maria Silva</p>
                </div>
                <div className="Class">
                  <BookMarked size={18} color="black" strokeWidth={1.5} />
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
              <h3 className="Subject">Manutenção Eletromecânica</h3>
              <div className="tag-course">
                <ChartLine size={20} color="white" />
                <p>Eletromecânica</p>
              </div>
              <div className="Info">
                <div className="Teacher">
                  <GraduationCap size={25} color="black" strokeWidth={1.5} />
                  <p>Luiz dos Santos</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={1.5} />
                  <GraduationCap size={18} color="black" strokeWidth={1.5} />
                  <p>Luiz dos Santos</p>
                </div>
                <div className="Class">
                  <BookMarked size={18} color="black" strokeWidth={1.5} />
                  <p>Tarde 2023</p>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>

          <div className="Card">
            <div className="Data">
              <h3 className="Subject">Programação WEB Front-End</h3>
              <div className="tag-course">
                <CodeXml size={20} color="white" />
                <p>Desenvolvimento de Sistemas</p>
              </div>
              <div className="Info">
                <div className="Teacher">
                  <GraduationCap size={25} color="black" strokeWidth={1.5} />
                  <p>Arthur Rosa</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={1.5} />
                  <GraduationCap size={18} color="black" strokeWidth={1.5} />
                  <p>Arthur Rosa</p>
                </div>
                <div className="Class">
                  <BookMarked size={18} color="black" strokeWidth={1.5} />
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
                  <GraduationCap size={25} color="black" strokeWidth={1.5} />
                  <p>José Roberto</p>
                </div>
                <div className="Class">
                  <BookMarked size={21} color="black" strokeWidth={1.5} />
                  <p>Noite 2023</p>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
                  <GraduationCap size={18} color="black" strokeWidth={1.5} />
                  <p>José Roberto</p>
                </div>
                <div className="Class">
                  <BookMarked size={18} color="black" strokeWidth={1.5} />
                  <p>Noite 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
