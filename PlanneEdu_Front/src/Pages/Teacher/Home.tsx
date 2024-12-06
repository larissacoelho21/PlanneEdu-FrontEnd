import { Link } from "react-router-dom";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import "../../Css/Teacher/Home.css"
import { useEffect, useState } from "react";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";
import { CardTeacher } from "../../Components/Box/BoxTeacher/BoxTeacher";
import { toast } from "sonner";
import { allTurmas } from "../../Services/Axios";

interface TurmaData {
  turma: {
    _id: string;
    nome: string;
    turno: string;
    dataInicio: string;
    dataTermino: string;
    qtdAlunos: number;
  };
  curso: string;
  semestres: number;
}

export function Home() {
  const [userName, setUserName] = useState<string | null>("");

  const [turmasAtivas, setTurmasAtivas] = useState<TurmaData[]>([]);
  useEffect(() => {
    // Recupera o nome do usuário do localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    getTurmas();
    /* const getTurmas = async () => {
      try {
        const response = await allTurmas(); // Chama a função que obtém as turmas
        console.log("Resposta da API:", response);
        setTurmasAtivas(response);
        
      } catch (error: any) {
        // Exibe o erro no console
        console.error(error);
        setTurmasAtivas([]); // Caso ocorra erro, define o estado como um array vazio
        alert(error.message || "Não foi possível encontrar turmas");
      }

      getTurmas();
    } */
  }, []);

  const getTurmas = async () => {
    try {
      const turmas = await allTurmas(); // Chama a função que obtém as turmas
      console.log("Resposta da API:", turmas); // Verifique os dados recebidos
      setTurmasAtivas(turmas); // Atualiza o estado com os dados das turmas
    } catch (error: any) {
      console.error("Erro ao buscar turmas:", error.message);
      setTurmasAtivas([]); // Caso ocorra erro, define o estado como um array vazio
      toast.error(error.message || "Não foi possível encontrar turmas");
    }
  };


  return (
    <section className="homeTeacher">
      <NavBarProfessor />
      <div className="texts-intro">
        <TextsIntroName
          userName={userName || "Usuário"}
          titleText="Seja bem vindo"
          subtitleText="Visualize suas turmas ativas"
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
          detail="|"
          classCard="Noite"
          yearClass="2023"
          dateI="30/02/2023"
          dateT="17/12/2024"
          semester={4}
          students="10"
        />
      </div>

      {/* {turmasAtivas.map((turma: any) => (
        <div className="cards-teacher">
          
            <Link to="/turmaprofessor" style={{ textDecoration: "none" }} key={turma._id}>

              <CardTeacher
                course={turma.nome || "Nome não disponível"}
                detail="|"
                classCard="SESI"
                yearClass="2023"
                dateI={turma.dataInicio || "Data não disponível"}
                dateT={turma.dataTermino || "Data não disponível"}
                semester={turma.turno || "Turno não informado"}
                students="35"
              />
            </Link>
          
        </div>
        ))} */}

      {turmasAtivas.map((turma: any) => (
        <div className="cards-teacher" key={turma._id}>  {/* Use a chave única aqui */}
          <Link to="/turmaprofessor" style={{ textDecoration: "none" }}>
            <CardTeacher
              course={turma.curso}
              detail="|"
              classCard={turma.turma.nome} 
              dateI={turma.turma.dataInicio}
              dateT={turma.turma.dataTermino} 
              semester={turma.semestres} 
              students={turma.qtdAlunos}
            />
          </Link>
        </div>
      ))}
    </section>
  );
}