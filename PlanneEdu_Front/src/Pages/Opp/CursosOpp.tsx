import { useEffect, useState } from "react";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/CursosOpp.css";
import { BookMarked, Clock3 } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function CursosOpp() {

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
      <NavBarOpp />

      <TextsIntroName
        userName={userName || "Usuário"}
        titleText="Olá"
        subtitleText="Veja os cursos disponíveis"
      />

      <div className="buttons-class">
        <a href="/addcurso">
          <button>+ Adicionar um novo curso</button>
        </a>
      </div>

      <div className="cards-cursosopp">
        <div className="Card">
          <div className="Data-curso">
            <h3 className="Subject">Desenvolvimento de Sistemas</h3>
            <div className="Info">
              <div className="semester-curso">
                <Clock3 size={18} />
                <h1>4 semestres</h1>
              </div>
              <div className="Class-curso">
                <BookMarked size={21} color="black" strokeWidth={1.5} />
                <p>5 turmas atribuídas </p>
              </div>
            </div>
            <div className="technology-curso">
              <span>Tecnologia da Informação - T.I</span>
            </div>

            <p>Visualizar mais informações sobre o curso</p>
          </div>
          <div className="Arrow">
            <ChevronRight size={50} color="black" strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
