import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import "../../Css/Teacher/Home.css";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";

import CardTeacher from "../../Components/Box/BoxTeacher/BoxTeacher";
import { classesTeacherEsp } from "../../Services/Axios";
import { toast } from "sonner";

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

  // Atualiza o nome do usuário a partir do localStorage
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
    </section>
  );
}
