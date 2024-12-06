import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import "../../Css/Teacher/Home.css";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";

import CardTeacher from "../../Components/Box/BoxTeacher/BoxTeacher";
import { classesTeacherEsp } from "../../Services/Axios";
import { toast } from "sonner";


import { toast } from "sonner";
import CardTeacher from "../../Components/Box/BoxTeacher/BoxTeacher";
/* import { allTurmas } from "../../Services/Axios"; */

/* interface TurmaData {
  _id: string;
  nome: string;
  turno: string;
  dataInicio: string;
  dataTermino: string;
  qtdAlunos: number;
  curso: string;
  semestres: number;
}
 */

export function Home() {
  const [userName, setUserName] = useState<string | null>("Usuário");
  const [classes, setClasses] = useState<
    {
      _id: string;
      nome: string;
      curso: string;
      dataInicio: string;
      dataTermino: string;
      estudantes: number;
      semestres: number;
    }[]
  >([]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);


  // Atualiza o nome do usuário a partir do localStorage

/*   const [turmasAtivas, setTurmasAtivas] = useState<TurmaData[]>([]);
 */

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Busca as turmas do professor
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await classesTeacherEsp();
        setClasses(data);
      } catch (err) {
        toast.error("Erro ao carregar as turmas!");
      }
    };

    fetchClasses();
  }, []);

  const handleCardClick = (classID: string | undefined) => {
    if (classID) {
      navigate(`/turmaprofessor/${classID}`);
    } else {
      toast.error("ID da turma não encontrado.");
    }
  };

  console.log("Lista de turmas:", classes);

    /* getTurmas(); */
  }, []);

  /* const getTurmas = async () => {
    try {
      const turmas = await allTurmas(); // Chama a função que obtém as turmas
      console.log("Resposta da API:", turmas); // Verifique os dados recebidos
      setTurmasAtivas(turmas.turmasAtivas); // Atualiza o estado com os dados das turmas
    } catch (error: any) {
      console.error("Erro ao buscar turmas:", error.message);
      setTurmasAtivas([]); // Caso ocorra erro, define o estado como um array vazio
      toast.error(error.message || "Não foi possível encontrar turmas");
    }
  }; */


  return (
    <section className="homeTeacher">
      <NavBarProfessor />
      <div className="texts-intro">
        <TextsIntroName
          userName={userName || "Usuário"}
          titleText="Seja bem-vindo"
          subtitleText="Visualize suas turmas ativas"
        />
      </div>

      <div className="cards-teacher">
        {classes.map((turma) => (
          <div
            key={turma._id} // Adicione o ID único como key
            onClick={() => handleCardClick(turma._id)}
            style={{ cursor: "pointer" }}
          >
            <CardTeacher
              course={turma.curso}
              detail="|"
              classCard={turma.nome}
              dateI={turma.dataInicio}
              dateT={turma.dataTermino}
              semester={turma.semestres}
              students={turma.estudantes}
            />
          </div>
        ))}
      </div>
=======
      <Link to="/turmaprofessor" style={{ textDecoration: "none" }}>
          <CardTeacher
            course="Desenvolvimento de sistemas"
            detail="|"
            classCard="SESI"
            dateI="23/02/2023"
            dateT="18/12/2024"
            semester={4}
            students={35}
          />
        </Link>
      </div>

      {/* <div className="cards-teacher">
        {turmasAtivas.map((item) => (
          <div className="cards-teacher" key={turma._id}>  { Use a chave única aqui }
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
         
        <CardTeacher
          course="Desenvolvimento de sistemas"
          detail="|"
          classCard="Noite"
          yearClass="2023"
          dateI="30/02/2023"
          dateT="17/12/2024"
          semester={4}
          students="10"
        />*
      </div>
 */}
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

    </section>
  );
}
