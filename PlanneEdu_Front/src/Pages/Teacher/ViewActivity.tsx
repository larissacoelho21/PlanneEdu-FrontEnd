import "../../Css/Teacher/ViewActivity.css";
import { Link } from "react-router-dom";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";
import { Clock3, Users } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonToAdd } from "../../Components/Buttons/Add/ToAdd";

interface ActivityCardProps {
  name: string;
  matter: string;
  dateI: string;
  dateE: string;
}

export function ActivityCard({ name, matter, dateI, dateE }: ActivityCardProps) {
  return (
    <div className="activity-card">
      <h2>{name}</h2>
      <div className="matter-card">
        <h2><span style={{color: "var(--blue-one)"}}>Matéria:</span> {matter}</h2>
      </div>
      <div className="dates-card">
        <div className="items-card-atvd">
          <h1>{dateI}</h1>
          <p>-</p>
          <h1>{dateE}</h1>
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
      matter: "FrontEnd",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 2,
      category: "Estudo-Caso",
      name: "Estudo de Caso",
      matter: "BackEnd",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 3,
      category: "Projeto",
      name: "Projeto",
      matter: "Projetos",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 4,
      category: "Pesquisa",
      name: "Pesquisa",
      matter: "BackEnd",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 5,
      category: "Pesquisa",
      name: "Pesquisa",
      matter: "Projetos",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
    {
      id: 6,
      category: "Projeto-Integrador",
      name: "Projeto Integrador",
      matter: "BackEnd",
      dateI: "02/08/2024",
      dateE: "08/08/2024",
    },
  ];

  const selectedCategory = filterActivities
    ? items.filter((item) => item.matter === filterActivities)
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

          <div className="view-mobile">
            <div className="infos-teacher-mobile">
              <div className="semester-teacher">
                <Clock3 size={20} />
                <h1>4 semestres</h1>
              </div>
              <div className="students">
                <Users size={20} />
                <h1>35 alunos</h1>
              </div>
            </div>
          </div>
        </div>

        <ButtonToAdd
          path="/addatividade"
          text="+ Adicionar atividade"
        />

        <div className="available-activities">
          <div className="activities-text">
            <h1>Atividades disponíveis</h1>
          </div>

          <div className="filter-activities-category">
            <div className="title-filter">
              <h1>Filtre por matéria:</h1>
            </div>
            <div
              className="buttons-filter" //TODO: Adicionar hover nos botões
            >
              <button onClick={() => setFilterActivities("FrontEnd")}>
                FrontEnd
              </button>
              <button onClick={() => setFilterActivities("BackEnd")}>
                BackEnd
              </button>
              <button onClick={() => setFilterActivities("Projetos")}>
                Projetos
              </button>
              <button onClick={() => setFilterActivities("")}>
                Mostrar todos
              </button>
            </div>

            <div
              className="buttons-filter-mobile" //TODO: Adicionar hover nos botões
            >
              <div className="buttons-view-mobile">
                <div>
                  <button
                    onClick={() => setFilterActivities("Situação-Problema")}
                  >
                    Situação Problema
                  </button>
                  <button onClick={() => setFilterActivities("Estudo-Caso")}>
                    Estudo de Caso
                  </button>
                </div>
                <div>
                  <button onClick={() => setFilterActivities("Projeto")}>
                    Projeto
                  </button>
                  <button id="projeto"
                    onClick={() => setFilterActivities("Projeto-Integrador")}
                  >
                    Projeto Integrador
                  </button>
                </div>
                <div>
                  <button onClick={() => setFilterActivities("Pesquisa")}>
                    Pesquisa
                  </button>
                  <button onClick={() => setFilterActivities("")}>
                    Mostrar todos
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="filtered-items">
            {selectedCategory.map((item) => (
              <ActivityCard
                key={item.id}
                name={item.name}
                matter={item.matter}
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
