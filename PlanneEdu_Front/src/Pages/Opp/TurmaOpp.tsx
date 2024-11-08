import { IntroText } from "../../Components/IntroTexts/IntroText";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/TurmaOpp.css";
import { Clock3, Users } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function TurmaOpp() {
  return (
    <section className="turmaOpp">
      <NavBarOpp />
      <div className="title-classopp" style={{margin: "5% 0 5% 0"}}>
        <IntroText
          titleText="Gerencie suas turmas"
          subtitleText="de Desenvolvimento de sistemas"
        />
      </div>

      <div className="classOpp">
        <div className="open-class">
          <p>
            <span className="highlight">Turmas abertas em:</span> 2023
          </p>
        </div>
        <div className="cards-turmaopp">
          <div className="Card">
            <div className="Data-curso">
              <h3 className="Subject">DS SESI 2023</h3>
              <div className="Info">
                <div className="semester-curso">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="Class-curso">
                  <Users size={18} />
                  <p>35 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/01/2023 | Término: 12/12/2024</span>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="cards-turmaopp">
          <div className="Card">
            <div className="Data-curso">
              <h3 className="Subject">DS Noite 2023</h3>
              <div className="Info">
                <div className="semester-curso">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="Class-curso">
                  <Users size={18} />
                  <p>15 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/02/2023 | Término: 12/12/2024</span>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="cards-turmaopp">
          <div className="Card">
            <div className="Data-curso">
              <h3 className="Subject">Libbs</h3>
              <div className="Info">
                <div className="semester-curso">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="Class-curso">
                  <Users size={18} />
                  <p>40 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 01/06/2023 | Término: 12/06/2025</span>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>

      <div className="classOpp">
        <div className="open-class">
          <p>
            <span className="highlight">Turmas abertas em:</span> 2024
          </p>
        </div>
        <div className="cards-turmaopp">
          <div className="Card">
            <div className="Data-curso">
              <h3 className="Subject">DS SESI 2024</h3>
              <div className="Info">
                <div className="semester-curso">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="Class-curso">
                  <Users size={18} />
                  <p>15 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/01/2023 | Término: 12/12/2024</span>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="cards-turmaopp">
          <div className="Card">
            <div className="Data-curso">
              <h3 className="Subject">DS Noite 2024</h3>
              <div className="Info">
                <div className="semester-curso">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="Class-curso">
                  <Users size={18} />
                  <p>15 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/02/2023 | Término: 12/12/2024</span>
              </div>
            </div>
            <div className="Arrow">
              <ChevronRight size={50} color="black" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
