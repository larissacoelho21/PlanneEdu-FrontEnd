import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { InfoClass } from "../../Components/Box/InfoClass/InfoClass";
import { LargeButton } from "../../Components/Buttons/LargeButton/LargeButton";
import { Popup } from "../../Components/PopUpClass/PopUp";
import "../../Css/Teacher/ClassTeacher.css"

export function ClassTeacher() {
  const { classID } = useParams();
  console.log("Class ID recebido:", classID);

  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [showPopUpPlane, setShowPopUpPlane] = useState(false);
  const [showPopUpSA, setShowPopUpSA] = useState(false);

  // Busca os dados da turma
  useEffect(() => {
    if (classID) {
      const fetchClassData = async () => {
        try {
          const token = localStorage.getItem("Authorization");
          if (!token) {
            throw new Error("Token não encontrado. Faça login novamente.");
          }
          const response = await axios.get(
            `https://planneedu-back.onrender.com/class/get_one/${classID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setClassData(response.data.selectedTurma);
        } catch (error) {
          toast.error("Erro ao buscar dados da turma.");
          console.error(error);
        } finally {
          setLoading(false); // Finaliza o estado de carregamento
        }
      };

      fetchClassData();
    } else {
      console.error("classID não foi definido!");
      setLoading(false);
    }
  }, [classID]);

  // Lógica de carregamento
  if (loading) {
    return <div>Carregando...</div>; // Indicador de carregamento
  }

  // Lógica para erro ao carregar dados
  if (!classData) {
    return <div>Erro ao carregar os dados da turma.</div>;
  }

  // Alterna exibição de pop-ups
  const togglePopUpPlanne = () => setShowPopUpPlane(!showPopUpPlane);
  const togglePopUpSA = () => setShowPopUpSA(!showPopUpSA);

  return (
    <section className="class-teacher">
      <div className="subnavbar-class">
        <SubNavbar />
      </div>

      <InfoClass
        course="Desenvolvimento de Sistemas"
        classCard={classData.nome}
        yearClass={new Date(classData.dataInicio).getFullYear().toString()}
        dateI={new Date(classData.dataInicio).toLocaleDateString()}
        dateT={new Date(classData.dataTermino).toLocaleDateString()}
        semester={4} // Atualize conforme necessário
        students={classData.alunos?.length?.toString() || "0"} // Verifique se alunos existe
      />

      <div className="buttons-class-teacher">
        <LargeButton
          text="Plano de Ensino"
          onClick={togglePopUpPlanne}
          className="large-button-text1"
        />
        <LargeButton
          text="Situação de Aprendizagem"
          onClick={togglePopUpSA}
          className="large-button-text"
        />
      </div>

      {showPopUpPlane && (
        <Popup
          title="Plano de Ensino"
          viewLink="/plansensino"
          viewText="Visualizar planos"
          addLink="/addplans"
          addText="Adicionar plano"
          onClose={togglePopUpPlanne}
        />
      )}

      {showPopUpSA && (
        <Popup
          title="Situação de Aprendizagem"
          viewLink="/visualizaratvd"
          viewText="Visualizar atividades"
          addLink="/addatividade"
          addText="Adicionar atividade"
          onClose={togglePopUpSA}
        />
      )}

      <div className="registration-table">
        <table className="table">
          <thead>
            <tr className="title-info">
              <th></th>
              <th id="title-name">Nome</th>
              <th>Matrícula</th>
            </tr>
          </thead>
          <tbody>
            {classData.alunos?.map((aluno: any, index: number) => (
              <tr key={aluno._id}>
                <td id="number">{index + 1}</td>
                <td id="name">{`${aluno.nome} ${aluno.sobrenome}`}</td>
                <td id="number">{aluno.matricula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}