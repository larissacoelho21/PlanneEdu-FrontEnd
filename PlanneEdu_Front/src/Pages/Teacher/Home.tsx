import { Link } from "react-router-dom";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import "../../Css/Teacher/Home.css";
import { Clock3, Users } from "lucide-react";
import { useEffect, useState } from "react";

export function Home() {
  const [userName, setUserName] = useState<string | null>("");

  useEffect(() => {
    // Recupera o nome do usuário do localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  return (
    <section className="homeTeacher">
      <NavBarProfessor />
      <div className="introTeacher">
        <h1>Seja bem-vindo, {userName || "Usuário"}</h1>
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
                <Clock3 size={18} />
                <h1>4 semestres</h1>
              </div>
              <div className="students">
                <Users size={18} />
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
              <Clock3 size={18} />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <Users size={18} />
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
              <Clock3 size={18} />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <Users size={18} />
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
              <Clock3 size={18} />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <Users size={18} />
              <h1>35 alunos</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
