import { CardTeacher } from "../../Components/Box/BoxTeacher/BoxTeacher";
import { ButtonToAdd } from "../../Components/Buttons/Add/ToAdd";
import { IntroText } from "../../Components/IntroTexts/IntroText";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/TurmaOpp.css";
import { Clock3, Users } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function TurmaOpp() {
  return (
    <section className="turmaOpp">
      <NavBarOpp />
      <div className="title-classopp" style={{ margin: "6% 0 3% 0" }}>
        <IntroText
          titleText="Gerencie suas turmas"
          subtitleText="de Desenvolvimento de sistemas"
        />
      </div>

      <ButtonToAdd path="/addclass" text="+ Adicionar uma nova turma" />

      <div className="classOpp" style={{ margin: "5% 0 0 0" }}>
        <div className="open-class">
          <p>
            <span className="highlight">Turmas abertas em:</span> 2023
          </p>
        </div>
        <div className="cards-turmaopp">
          <div className="card-class">
              <h3 className="subject">DS SESI 2023</h3>
              <div className="info">
                <div className="semester-course">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="class-curso">
                  <Users size={18} />
                  <p>35 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/01/2023 | Término: 12/12/2024</span>
              </div>
          </div>

          <div className="card-class">
              <h3 className="subject">DS SESI 2023</h3>
              <div className="info">
                <div className="semester-course">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="class-curso">
                  <Users size={18} />
                  <p>35 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/01/2023 | Término: 12/12/2024</span>
              </div>
          </div>

          <div className="card-class">
              <h3 className="subject">DS SESI 2023</h3>
              <div className="info">
                <div className="semester-course">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="class-curso">
                  <Users size={18} />
                  <p>35 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/01/2023 | Término: 12/12/2024</span>
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
          <div className="card-class">
              <h3 className="subject">DS SESI 2023</h3>
              <div className="info">
                <div className="semester-course">
                  <Clock3 size={18} />
                  <h1>4 semestres</h1>
                </div>
                <div className="class-curso">
                  <Users size={18} />
                  <p>35 alunos</p>
                </div>
              </div>
              <div className="technology-turma">
                <span>Início: 23/01/2023 | Término: 12/12/2024</span>
              </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
