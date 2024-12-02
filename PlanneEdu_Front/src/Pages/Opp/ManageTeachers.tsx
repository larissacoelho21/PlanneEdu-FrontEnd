import { IntroText } from "../../Components/IntroTexts/IntroText";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";
import { FilterCategory } from "../../Components/FilterCategory/FilterCategory";
import "../../Css/Opp/ManageTeachers.css";

import { useEffect, useState } from "react";
import { Mail, Phone, Trash, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { allUsers, deleteUser } from "../../Services/Axios";
import { toast } from "sonner";


interface ProfileData {
  _id: string
  nome: string;
  sobrenome: string;
  nif: string;
  telefone: string;
  email: string;
  turmasAtribuidas: string[];
  cursosAtribuidos: string[];
  materiasAtribuidos: string[];
}

export function ManageTeachers() {
  /* const [isExpanded, setIsExpanded] = useState(false); */
  const [users, setUsers] = useState<ProfileData[]>([]);
/*   const [isExpandedCard, setIsExpandedCard] = useState<number | null>(null);
 */  const [expandedCard, setExpandedCard] = useState<number | null>(null); // Controla qual card está expandido

  const toggleCard = (index: number) => {
    setExpandedCard((prevIndex) => (prevIndex === index ? null : index));
  };
  /* const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  }; */

  //criando card para cada usuário
  /*  const toggleExpandCard = (index: number) => {
     setIsExpandedCard((prevIndex) => (prevIndex === index ? null : index)); // Expande ou colapsa o card
   }; */

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await allUsers("docente");
        setUsers(response); // Acessando o campo `user` diretamente
      } catch (error: any) {
        throw new Error(error.message || "Não foi possível encontrar os usuários");
      }
    };

    getUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    //TODO: arrumar toast
    const toastId = toast(
      <div>
        <p>Tem certeza que deseja excluir este usuário?</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={() => {
              confirmDeleteUser(id); // Chama a função de confirmação
              toast.dismiss(toastId); // Fecha o toast
            }}
            style={{
              background: "red",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
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
              padding: "5px 10px",
              borderRadius: "5px",
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
            titleText="Gerencie os docentes"
            subtitleText="Visualize suas principais informações"
          />
        </div>

        <div className="buttons-class">
          <a href="/addUser"><button>+ Adicionar um novo docente</button></a>
        </div>
        <FilterCategory />

        <div className="teacher-cards">
          {users.map((user, index) => (
            <div key={index} className="teacher-card">
              <div className="teacher-card2">
                <h1>{user.nome} {user.sobrenome}</h1>
                <div className="lock">
                  <Lock size={19} strokeWidth={1.5} /> <p>NIF: {user.nif}</p>
                  <div className="chevron-container"
                    onClick={() => toggleCard(index)} style={{ cursor: "pointer" }}>
                    {expandedCard === index ? (
                      <ChevronUp size={40} color="black" strokeWidth={1} />
                    ) : (
                      <ChevronDown size={40} color="black" strokeWidth={1} />
                    )}

                  </div>
                </div>
                <div className="teacher-development">
                  <span>{user.cursosAtribuidos?.join(', ') || "Sem cursos atribuídos"}</span>
                </div>
              </div>

              {/* //TODO: refazer css dessa segunda parte */}
              {expandedCard === index && (
                <div  /* className={`additional-info ${isExpanded ? "expanded" : "collapsed"}`} */>
                  <h2>Turmas Atribuídas</h2>
                  <ul className="a">
                    {user?.turmasAtribuidas?.length ? (
                      user.turmasAtribuidas.map((turma, index) => (
                        <li key={index}>{turma}</li>
                      ))
                    ) : (
                      <li>Nenhuma turma atribuída</li>
                    )}

                  </ul>

                  <h2>Matérias</h2>
                  <ul className="a">
                    {user?.materiasAtribuidos?.length ? (
                      user.materiasAtribuidos.map((curso, index) => (
                        <li key={index}>{curso}</li>
                      ))
                    ) : (
                      <li>Nenhuma matéria atribuída</li>
                    )}

                  </ul>

                  <h2>Informações de contato</h2>
                  <div className="email-manage">
                    <Mail size={18} color="black" strokeWidth={1} />
                    <p>{user.email}</p>
                  </div>
                  <div className="phone-manage">
                    <Phone size={18} color="black" strokeWidth={1} />
                    <p>{user.telefone}</p>
                  </div>

                  <div className="button-manage">
                    <button onClick={() => handleDeleteUser(user._id)}>
                      <span className="changeColor">
                        <Trash size={25} color="black" strokeWidth={1.5} />
                      </span>
                      <span className="delete-manage">Excluir docente</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <div className="teacher-card">
        <div className="teacher-card2">
          <h1>Arthur Rosa</h1>
          <div className="lock">
            <Lock size={19} strokeWidth={1.5} /> <p>NIF: 128492220</p>
            <div className="chevron-container" onClick={toggleExpand} style={{ cursor: "pointer" }}>
              {isExpanded ? (
                <ChevronUp size={40} color="black" strokeWidth={1} />
              ) : (
                <ChevronDown size={40} color="black" strokeWidth={1} />
              )}
            </div>
          </div>
          <div className="teacher-development">
            <span>Desenvolvimento de sistemas</span>
          </div>
        </div>


        {/* Conteúdo adicional 
        {isExpanded && (
          <div className={`additional-info ${isExpanded ? "expanded" : "collapsed"}`}>
            <h2>Turmas Atribuídas</h2>
            <ul className="a">
              <li>DEV SESI - 2023</li>
              <li>DEV Noite - 2023</li>
              <li>Libbs</li>
              <li>DS SESI - 2024</li>
              <li>DS Noite - 2024</li>
            </ul>

            <h2>Matérias</h2>
            <ul className="a">
              <li>Banco de Dados</li>
              <li>Programação Orientada a Objetos</li>
              <li>Programação BackEnd</li>
            </ul>

            <h2>Informações de contato</h2>
            <div className="email-manage">
              <Mail size={18} color="black" strokeWidth={1} />
              <p>arthur.rosa@gmail.com</p>
            </div>
            <div className="phone-manage">
              <Phone size={18} color="black" strokeWidth={1} />
              <p>11 97391-0399</p>
            </div>

            <div className="button-manage">
              <button>
                <span className="changeColor">
                  <Trash size={25} color="black" strokeWidth={1.5} />
                </span>
                <span className="delete-manage">Excluir docente</span>
              </button>
            </div>
          </div>
        )}

      </div> */}

      </section>
    );
  }