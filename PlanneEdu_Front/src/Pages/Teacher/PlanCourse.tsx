import { Clock3, Pointer } from "lucide-react";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import { FilterCategory } from "../../Components/FilterCategory/FilterCategory";
import "../../Css/Teacher/PlanCourse.css";
import { IntroText } from "../../Components/IntroTexts/IntroText";
import { useEffect, useState } from "react";
import { allPlanCourse, downloadPdf_PlanCourse } from "../../Services/Axios";
import { toast } from "sonner";

export function PlanCourse() {
  const [planosCurso, setPlanosCurso] = useState<any[]>([]);

  useEffect(() => {
    const getPlanCourse = async () => {
      try {
        const response = await allPlanCourse();
        console.log("Resposta da API:", response);
        setPlanosCurso(response);
      } catch (error: any) {
        throw new Error(
          error.message || "Não foi possível encontrar os usuários"
        );
      }
    };

    getPlanCourse();
  }, []);

  const handleDownload = async (id: string) => {
    console.log("ID do curso:", id);
    if (!id) {
      console.error("ID inválido ou não fornecido!");
      toast.error("Não foi possível realizar o download do PDF. ID inválido.");
      return;
    }

    console.log("ID na requisição Axios:", id);
    
    try {
      await downloadPdf_PlanCourse(id);
      console.log("Planos de Curso:", planosCurso);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar o download do PDF.");
    }
  };

  return (
    <section className="plancourseteacher">
      <div className="navbar-placourse">
        <NavBarProfessor />
      </div>

      <div className="title-plancourse" style={{ marginTop: "5%" }}>
        <IntroText
          titleText="Planos de Curso"
          subtitleText="Visualize os planos de curso disponíveis "
        />
      </div>

      <div className="filter-plancourse">
        <FilterCategory />
      </div>
      <div className="cards-planscourses">
        {planosCurso.map((curso: any) => (
          <div key={curso._id} className="box-teacher-plancourse">
            <h1>{curso.nome}</h1>
            <div className="semesterCourse">
              <Clock3 size={20} />
              <span>{curso.qtdSemestre} semestres</span>
            </div>
            <div className="categoryBadge">
              <span>{curso.categoria}</span>
            </div>
            <div className="dowload-pdf">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDownload(curso._id)}
              >
                Clique aqui e baixe o PDF
              </span>
            </div>
          </div>
        ))}

        {/* <div className="box-teacher-plancourse">
          <h1>Eletromecânica</h1>
          <div className="semesterCourse">
            <Clock3 size={18} />
            <span>4 semestres</span>
          </div>
          <div className="categoryBadge">
            <span>Controle e Processos Industriais</span>
          </div>
          <div className="dowload-pdf">
            <span>Clique aqui e baixe o PDF</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}
