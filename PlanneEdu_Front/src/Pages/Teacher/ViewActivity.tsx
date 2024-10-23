import "../../Css/Teacher/ViewActivity.css";
import { Link } from "react-router-dom";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";
import { Clock3, Users } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ActivityCardProps {
  name: string;
  dateI: string;
  dateE: string;
}

export function ActivityCard({ name, dateI, dateE }: ActivityCardProps) {
  return (
    <div className="activity-card">
      <h2>{name}</h2>
      <div className="dates-card">
        <div className="items-card-atvd">
          <p>{dateI}</p>
          <p>-</p>
          <p>{dateE}</p>
        </div>
      </div>
    </div>
  );
}

export function ViewActivity() {
  const [filterActivities, setFilterActivities] = useState("");

  const items = [
    {
      id: 1,
      category: "Situação-Problema",
      name: "Situação Problema",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 2,
      category: "Estudo-Caso",
      name: "Estudo de Caso",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 3,
      category: "Projeto",
      name: "Projeto",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 4,
      category: "Pesquisa",
      name: "Pesquisa",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 5,
      category: "Pesquisa",
      name: "Pesquisa",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 6,
      category: "Projeto-Integrador",
      name: "Projeto Integrador",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
  ];

  const selectedCategory = filterActivities
    ? items.filter((item) => item.category === filterActivities)
    : items;

  return (
    <section className="view-activity">
      <SubNavbar />
      <div className="infos-visu-atividade">
        <div className="box-info-class">
          <h1>Desenvolvimento de Sistemas | SESI 2023</h1>
          <div className="date-badge">
            <span>23/02/2023 — 18/12/2024</span>
          </div>
          <div className="infos-teacher">
            <div className="semester-teacher">
              <Clock3 size={18} />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <Users size={18} />
              <h1>35 alunos</h1>
            </div>
          </div>
          <div className="discipline">
            <h1>Disciplina:</h1>
            <h2>Desenvolvimento mobile</h2>
          </div>
        </div>

        <div className="button-addActivity">
          <Link to="">
            <FontAwesomeIcon icon={faPlus} />
            <h1>Adicionar nova atividade</h1>
          </Link>
        </div>

        <div className="available-activities">
          <div className="activities-text">
            <h1>Atividades disponíveis</h1>
          </div>

          <div className="filter-activities-category">
            <div className="title-filter">
              <h1>Filtre por categoria:</h1>
            </div>
            <div className="buttons-filter">
              <button onClick={() => setFilterActivities("Situação-Problema")}>
                Situação Problema
              </button>
              <button onClick={() => setFilterActivities("Estudo-Caso")}>
                Estudo de Caso
              </button>
              <button onClick={() => setFilterActivities("Projeto")}>
                Projeto
              </button>
              <button onClick={() => setFilterActivities("Projeto-Integrador")}>
                Projeto Integrador
              </button>
              <button onClick={() => setFilterActivities("Pesquisa")}>
                Pesquisa
              </button>
              <button onClick={() => setFilterActivities("")}>
                Mostrar todos
              </button>
            </div>
          </div>
          <div className="filtered-items">
            {selectedCategory.map((item) => (
              <ActivityCard
                key={item.id}
                name={item.name}
                dateI={item.dateI}
                dateE={item.dateE}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
