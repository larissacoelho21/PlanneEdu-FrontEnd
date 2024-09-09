import "../../Css/Teacher/Home.css";
import SemesterTeacher from "../../assets/clock.svg";
import StudentsTeacher from "../../assets/peoples.svg";

export function Home() {
  return (
    <section className="homeTeacher">
      <div className="introTeacher">
        <h1>Seja bem-vindo, Giovani!</h1>
        <h2>Visualize suas turmas ativas</h2>
        <hr />
      </div>

      <div className="cardsTeacher">
        <div className="box-teacher">
          <h1>Desenvolvimento de sistemas | SESI 2023</h1>
          <div className="date-badge">
            <span>23/02/2023 — 18/12/2024</span>
          </div>
          <div className="infos-teacher">
            <div className="semester-teacher">
              <img src={SemesterTeacher} alt="" />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <img src={StudentsTeacher} alt="" />
              <h1>35 alunos</h1>
            </div>
          </div>
        </div>
        <div className="box-teacher">
          <h1>Desenvolvimento de Sistemas | Noite 2023</h1>
          <h2>30/02/2023 — 23/12/2024</h2>
          <div className="infos-teacher">
            <div className="semester-teacher">
              <img src={SemesterTeacher} alt="" />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <img src={StudentsTeacher} alt="" />
              <h1>27 alunos</h1>
            </div>
          </div>
        </div>
        <div className="box-teacher">
          <h1>Desenvolvimento de Sistemas | LIBBS 2023</h1>
          <h2>23/02/2023 — 25/12/2024</h2>
          <div className="infos-teacher">
            <div className="semester-teacher">
              <img src={SemesterTeacher} alt="" />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <img src={StudentsTeacher} alt="" />
              <h1>23 alunos</h1>
            </div>
          </div>
        </div>
        <div className="box-teacher">
          <h1>Desenvolvimento de Sistemas | SESI 2024</h1>
          <h2>27/02/2024 — 18/12/2025</h2>
          <div className="infos-teacher">
            <div className="semester-teacher">
              <img src={SemesterTeacher} alt="" />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <img src={StudentsTeacher} alt="" />
              <h1>34 alunos</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
