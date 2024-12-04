import { Link } from "react-router-dom";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import "../../Css/Teacher/Home.css"
import { useEffect, useState } from "react";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";
import { CardTeacher } from "../../Components/Box/BoxTeacher/BoxTeacher";

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
      <div className="texts-intro">
      <TextsIntroName
        userName={userName || "Usuário"}
        titleText="Seja bem vindo"
        subtitleText="Visualize suas turmas ativas"
      />
      </div>
      
      <div className="cards-teacher">
        <Link to="/turmaprofessor" style={{ textDecoration: "none" }}>
          <CardTeacher
            course="Desenvolvimento de sistemas"
            detail="|"
            classCard="SESI"
            yearClass="2023"
            dateI="23/02/2023"
            dateT="18/12/2024"
            semester={4}
            students="35"
          />
        </Link>
        <CardTeacher
          course="Desenvolvimento de sistemas"
          classCard="Noite"
          yearClass="2023"
          dateI="30/02/2023"
          dateT="17/12/2024"
          semester={4}
          students="10"
        />
      </div>
    </section>
  );
}