import { useEffect, useState } from "react";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import "../../Css/Opp/HomeOpp.css";
import { Link } from "react-router-dom";
import { TextsIntroName } from "../../Components/IntroName/TextIntroName";
import { fetchHome } from "../../Services/Axios";
interface Plano {
  planoId: string;
  materia: string;
}

interface Professor {
  nome: string;
  planos: Plano[];
}

export interface LinhaTabela {
  turma: string;
  professores: Record<string, Professor>;
}


export function HomeOpp() {
  const [userName, setUserName] = useState<string | null>("");
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
          <table className="table-homeopp">
            <thead>
              <tr>
                <th id="title-homeopp" colSpan={4}>
                  Desenvolvimento de sistemas
                </th>
              </tr>
              <tr>
                <th></th>
                {tabela.length > 0 && Object.keys(tabela[0].professores).map((professorId) => (
                  <th key={professorId} id="subtitle">
                    {tabela[0].professores[professorId].nome}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabela.map((linha, index) => (
                <tr key={index}>
                  <td className="turmas-homeopp">{linha.turma}</td>
                  {Object.keys(linha.professores).map((professorId) => (
                    <td key={professorId} className="td">
                      {linha.professores[professorId].planos.map((plano, idx) => (
                        <Link
                          to={`/planos/${plano.planoId}`}
                          key={idx}
                          className="button"
                        >
                          {plano.materia}
                        </Link>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
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
      </div> */}
    </section>
  );
}
