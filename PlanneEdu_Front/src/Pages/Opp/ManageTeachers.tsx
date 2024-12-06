import { IntroText } from "../../Components/IntroTexts/IntroText";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import { FilterCategory } from "../../Components/FilterCategory/FilterCategory";
import "../../Css/Opp/ManageTeachers.css";

import { useEffect, useState } from "react";
import { Mail, Phone, Trash, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { allUsers, deleteUser } from "../../Services/Axios";
import { toast } from "sonner";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";


interface ProfileData {
  _id: string
  nome: string;
  sobrenome: string;
  nif: string;
  telefone: string;
  email: string;
}

/* interface Turma {
  _id: string;
  nome: string;
}

interface Curso {
  _id: string;
  planoCurso: {
    nome: string;
  };
} */


export function ManageTeachers() {
  const [users, setUsers] = useState<ProfileData[]>([]);
  /* const [turmas, setTurmas] = useState<Turma[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
 */
  const [expandedCard, setExpandedCard] = useState<number | null>(null); // Controla qual card está expandido

  const toggleCard = (index: number) => {
    setExpandedCard((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await allUsers();
        setUsers(response || []);

        console.log('Resposta da API:', response);
      } catch (error: any) {
        throw new Error(error.message || "Não foi possível encontrar os usuários");
      }
    };

    getUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    const toastId = toast(
      <div>
        <p style={{ textAlign: "start", marginLeft: "-1px" }}>Tem certeza que deseja excluir este usuário?</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={() => {
              confirmDeleteUser(id); // Chama a função de confirmação
              toast.dismiss(toastId); // Fecha o toast
            }}
            style={{
              background: "#e43c3c",
              color: "white",
              padding: "0.5vw 1vw",
              borderRadius: "0.5vw",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sim
          </button>
          <button
            onClick={() => toast.dismiss(toastId)} // Apenas fecha o toast
            style={{
              background: "gray",
              color: "white",
              padding: "0.5vw 1vw",
              borderRadius: "0.5vw",
              border: "none",
              cursor: "pointer",
            }}
          >
            Não
          </button>
        </div>
      </div>,
      {
        duration: Infinity, // Mantém o toast aberto até que o usuário clique em uma opção
      }
    );
    const confirmDeleteUser = async (id: string) => {
      try {
        await deleteUser(id); // Chama a API para excluir o usuário
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Remove o usuário da lista
        toast.success("Usuário deletado com sucesso!"); // Exibe mensagem de sucesso
      } catch (error: any) {
        toast.error("Erro ao deletar o usuário: " + error.message); // Exibe mensagem de erro
      }
    };
  } 


  return (
    <section className="homeTeacher">
      <NavBarOpp />
      <div className="title-plancourseopp">
        <IntroText
          titleText="Gerencie os usuários"
          subtitleText="Visualize suas principais informações"
        />
      </div>

      <div className="buttons-class">
        <a href="/addUser"><button>+ Adicionar um novo usuário</button></a>
      </div>
      <FilterCategory />

      <div className="teacher-cards">
        {users.map((user, index) => (
          <div key={index} className={`teacher-card ${expandedCard === index ? "expanded" : ""}`}>
            <div className="teacher-card2">
              <h1 style={{ fontSize: '2vw' }}>{user.nome} {user.sobrenome}</h1>
              <div className="lock">
                <Lock className="lock-icon" size={19} strokeWidth={1.5} /> <p>NIF: {user.nif}</p>
                <div className="chevron-container"
                  onClick={() => toggleCard(index)} style={{ cursor: "pointer" }}>
                  {expandedCard === index ? (
                    <ChevronUp className="seta-baixo" size={40} color="black" strokeWidth={1} />
                  ) : (
                    <ChevronDown className="seta-cima" size={40} color="black" strokeWidth={1} />
                  )}
                </div>
              </div>
            </div>

            {expandedCard === index && (
              <div className="info-docentes">
                <div  /* className={`additional-info ${isExpanded ? "expanded" : "collapsed"}`} */>
                  <h2>Informações de contato</h2>
                  <div className="email-manage">
                    <Mail className="email-btn" size={18} color="black" strokeWidth={1} />
                    <p>{user.email}</p>
                  </div>
                  <div className="phone-manage">
                    <Phone className="phone-btn" size={18} color="black" strokeWidth={1} />
                    <p>{user.telefone}</p>
                  </div>

                  <div className="button-manage">
                    <button onClick={() => handleDeleteUser(user._id)}>
                      <Trash className="icon-btn-delete" size={20} color="white" strokeWidth={1.5} /> Excluir docente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}