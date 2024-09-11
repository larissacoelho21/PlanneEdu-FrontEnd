import { Link } from "react-router-dom";
import { NavBarProfessor } from "../../Components/NavBar-Professores/navBarProfessor";
import "../../Css/Teacher/Home.css";
import SemesterTeacher from "../../assets/clock.svg";
import StudentsTeacher from "../../assets/peoples.svg";

export function Home() {
  return (
    <section className="homeTeacher">
      <NavBarProfessor />
      <div className="introTeacher">
        <h1>Seja bem-vindo, Giovani!</h1>
        <h2>Visualize suas turmas ativas</h2>
        <hr />
      </div>

      <div className="cardsTeacher">
        <Link to="/turmaprofessor" style={{ textDecoration: "none" }}>
          {" "}
          {/* Evita sublinhado no texto */}
          <div className="box-teacher">
            <h1>Desenvolvimento de sistemas | SESI 2023</h1>
            <div className="date-badge">
              <span>23/02/2023 — 18/12/2024</span>
            </div>
            <div className="infos-class">
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
        </Link>
        <div className="box-teacher">
          <h1>Desenvolvimento de sistemas | SESI 2023</h1>
          <div className="date-badge">
            <span>23/02/2023 — 18/12/2024</span>
          </div>
          <div className="infos-class">
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
          <h1>Desenvolvimento de sistemas | SESI 2023</h1>
          <div className="date-badge">
            <span>23/02/2023 — 18/12/2024</span>
          </div>
          <div className="infos-class">
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
          <h1>Desenvolvimento de sistemas | SESI 2023</h1>
          <div className="date-badge">
            <span>23/02/2023 — 18/12/2024</span>
          </div>
          <div className="infos-class">
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
      </div>
    </section>
  )
}