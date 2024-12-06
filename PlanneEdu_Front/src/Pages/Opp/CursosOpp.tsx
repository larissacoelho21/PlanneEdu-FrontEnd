import { useEffect, useState } from "react";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/CursosOpp.css";
import { BookMarked, Clock3 } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ButtonAdd } from "../../Components/Buttons/More/More";
import { ButtonToAdd } from "../../Components/Buttons/Add/ToAdd";
import { getAllCursos } from "../../Services/Axios";

export function CursosOpp() {
  const [userName, setUserName] = useState<string | null>("");
  const [cursos, setCursos] = useState<any[]>([])

  useEffect(() => {
    // Recupera o nome do usuário do localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const response = await getAllCursos();
      console.log("Resposta da API:", response);
      setCursos(response);
    } catch (error: any) {
      throw new Error(
        error.message || "Não foi possível encontrar os usuários"
      );
    }
  }

  return (
    <section className="homeTeacher">
      <NavBarOpp />
      <div className="title-cursos-opp" style={{ margin: "0 0 -3% 0" }}>
        <TextsIntroName
          userName={userName || "Usuário"}
          titleText="Olá"
          subtitleText="Veja os cursos disponíveis"
        />
      </div>
      <div className="button-add-course">
        <ButtonToAdd path="/addcurso" text="+ Adicionar um novo curso" />
      </div>

      <div className="cards-cursosopp">
        <div className="card-course">
          {cursos.map((curso: any) => (
            <div className="data-curso">
              <h3 className="subject">{curso.nome}</h3>
              <div className="info">
                <div className="number-semesters">
                  <Clock3 size={18} className="clock-semester" />
                  <h1>{curso.qtdSemestre} semestres</h1>
                </div>
              </div>
              <div className="technology-curso">
                <span>{curso.categoria}</span>
              </div>
            </div>
          ))}
        </div>


        {/* <div className="card-course">
          <div className="data-curso">
            <h3 className="subject">Desenvolvimento de Sistemas</h3>
            <div className="info">
              <div className="number-semesters">
                <Clock3 size={18} className="clock-semester" />
                <h1>4 semestres</h1>
              </div>
              <div className="assigned-classes">
                <BookMarked
                  size={21}
                  color="black"
                  strokeWidth={1.5}
                  className="bookmarked"
                />
                <h1>5 turmas atribuídas </h1>
              </div>
            </div>
            <div className="technology-curso">
              <span>Tecnologia da Informação - T.I</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
