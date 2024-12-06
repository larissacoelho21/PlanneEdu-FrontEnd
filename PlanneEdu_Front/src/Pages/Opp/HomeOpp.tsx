import { useEffect, useState } from "react";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/HomeOpp.css";
import { Link } from "react-router-dom";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";
import { allPlanEns } from "../../Services/Axios";
import { IntroText } from "../../Components/IntroTexts/IntroText";
import { CardPlan } from "../../Components/Box/BoxPlan/BoxPlan";
import { BookMarked, GraduationCap } from "lucide-react";

export function HomeOpp() {
  const [userName, setUserName] = useState<string | null>("");
  const [planoEns, setPlanosEns] = useState<any[]>([]);

  useEffect(() => {
    // Recupera o nome do usuário do localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    getPlanEns();
  }, []);
  
  const getPlanEns = async () => {
    try {
      const response = await allPlanEns();
      console.log("Resposta da API:", response);
      setPlanosEns(response);
    } catch (error: any) {
      console.error(
        error.message || "Não foi possível carregar os planos de ensino."
      );
    }
  };

  return (
    <main>
      {/* Cabeçalho */}
      <header className="header">
        <NavBarOpp />
      </header>

      {/* Título principal */}
      <section className="title-planensino" style={{ margin: "5% 0" }}>
        <TextsIntroName
          userName={userName || "Usuário"}
          titleText="Seja bem vindo"
          subtitleText="Visualize os planos de ensino disponíveis"
        />
      </section>

      {/* Subtítulo */}
      <section className="title-plans-available">
        <h2>Planos de ensino disponíveis</h2>
      </section>


      {/* Planos dinâmicos */}
      {planoEns.map((plano, index) => (
        <CardPlan
          key={index}
          matter={plano.materia}
          course={plano.curso}
          iconTeacher={
            <GraduationCap size={23} color="black" strokeWidth={1.5} />
          }
          teacher={plano.professor}
          iconClass={<BookMarked size={18} color="black" strokeWidth={1.5} />}
          shiftCourse={plano.turma}
        />
      ))}
    </main>
  );
}


  /* const [userName, setUserName] = useState<string | null>("");
  const [tabela, setTabela] = useState<LinhaTabela[]>([]);

  const courseID = "6752ae043224e375940edcbd6752ae043224e375940edcbd"

  useEffect(() => {
    // Recupera o nome do usuário do localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await fetchHome(courseID); // Passa o courseID corretamente
      setTabela(response); // Atualiza o estado com os dados
    } catch (error: any) {
      console.error("Erro ao carregar tabela:", error.message);
    }
  };
  return (
    <section className="homeTeacher">
      <NavBarOpp />
      <TextsIntroName
        userName={userName || "Usuário"}
        titleText="Seja bem vindo"
        subtitleText="Visualize os planos de ensino disponíveis"
      />



      <div className="table-container">
        {tabela.map((turmaData, index) => (
          <table className="table-homeopp" key={index}>
            <thead>
              <tr>
                <th id="title-homeopp" colSpan={Object.keys(turmaData.professores).length + 1}>
                  {turmaData.turma}
                </th>
              </tr>
              <tr>
                <th></th>
                {Object.keys(turmaData.professores).map((professorId) => (
                  <th key={professorId} id="subtitle">
                    {turmaData.professores[professorId]?.nome || "Professor não encontrado"}                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="turmas-homeopp">{turmaData.turma}</td>
                {Object.keys(turmaData.professores).map((professorId) => (
                  <td key={professorId} className="td">
                    {turmaData.professores[professorId]?.planos.map((plano, idx) => (
                      <Link
                        to={`/planos/${plano.planoId}`}
                        key={plano.planoId || idx}
                        className="button"
                      >
                        {plano.materia}
                      </Link>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
      </div>


      {/* <div className="table-container">
        <table className="table-homeopp">
          <thead>
            <tr>
              <th id="title-homeopp" colSpan={4}>
                Desenvolvimento de sistemas
              </th>
            </tr>
            <tr>
              <th></th>
              <th id="subtitle">Arthur</th>
              <th id="subtitle">Giovani</th>
              <th id="subtitle">Samuel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="turmas-homeopp">Dev. SESI 2023</td>
              <td className="td">
                <Link to="" className="button">
                  Prog. Back
                </Link>
              </td>
              <td className="td">
                <Link to="" className="button">
                  Projetos
                </Link>
                <Link to="" className="button">
                  Requisitos
                </Link>
              </td>
              <td className="td">
                <Link to="" className="button">
                  Projetos
                </Link>
              </td>
            </tr>
            <tr>
              <td className="turmas-homeopp">Dev. Noite 2023</td>
              <td className="td"></td>
              <td className="td"></td>
              <td className="td"></td>
            </tr>
            <tr>
              <td className="turmas-homeopp">Libbs</td>
              <td className="td"></td>
              <td className="td"></td>
              <td className="td"></td>
            </tr>
            <tr>
              <td className="turmas-homeopp">DS SESI 2024</td>
              <td className="td"></td>
              <td className="td"></td>
              <td className="td"></td>
            </tr>
            <tr>
              <td className="turmas-homeopp1">DS Noite 2024</td>
              <td className="td1"></td>
              <td className="td1"></td>
              <td className="td2"></td>
            </tr>
          </tbody>
        </table>
      </div> }
    </section>
  ); */
