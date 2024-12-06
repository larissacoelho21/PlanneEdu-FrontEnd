import { ButtonToAdd } from "../../Components/Buttons/Add/ToAdd";
import { IntroText } from "../../Components/IntroTexts/IntroText";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/TurmaOpp.css";
import { Clock3, Users } from "lucide-react";
import { allTurmasOpp } from "../../Services/Axios";
import { useEffect, useState } from "react";

interface Aluno {
  nome: string;
  sobrenome: string;
}

interface Grade {
  materia: {
    nome: string;
    cargaHoraria: number;
  };
  professor: {
    nome: string;
    sobrenome: string;
  };
}

interface Turma {
  nome: string;
  grade: Grade[];
  alunos: Aluno[];
  inicio: string;
  termino: string;
}


export function TurmaOpp() {
  const [turmas, setTurmas] = useState<Turma[]>([]); // Estado para armazenar as turmas

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const turmasData = await allTurmasOpp(); // Chama a função para pegar as turmas
        setTurmas(turmasData); // Armazena as turmas no estado
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
      }
    };
    
    fetchTurmas(); // Chama a função de fetch ao montar o componente
  }, []);

  const renderTurmas = (): JSX.Element[] => {
    return turmas.map((turma, index) => (
      <div className="card-class" key={index}>
        <h3 className="subject">{turma.nome}</h3>
        <div className="info-class">
          <div className="semester-course">
            <Clock3 size={18} />
            <h1>{turma.grade.length} semestres</h1>
          </div>
          <div className="number-students">
            <Users size={18} />
            <h1>{turma.alunos.length} alunos</h1>
          </div>
        </div>
      </div>
    ));
  };
  
  return (

    <section className="turmaOpp">
      <NavBarOpp />
      <div className="text-intro-class" style={{ margin: "6% 0 3% 0" }}>
        <IntroText
          titleText="Gerencie as turmas"
          subtitleText="Adicione e visualize as turmas disponíveis"
        />
      </div>

      <div className="button-add-class">
        <ButtonToAdd path="/addclass" text="+ Adicionar uma nova turma" />
      </div>

      <div className="classOpp" style={{ margin: "5% 0 0 0" }}>
        <div className="cards-turmaopp">
        {renderTurmas()}
        </div>
      </div>
    </section>
  );
}