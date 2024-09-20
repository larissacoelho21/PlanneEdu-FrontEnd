import semesterIcon from "../../assets/clock.svg";
import studentsIcon from "../../assets/peoples.svg";
import moreIcon from "../../assets/more.svg";

import "../../Css/Teacher/ViewActivity.css";
import { Link } from "react-router-dom";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";

export function ViewActivity() {
  const [filterActivities, setFilterActivities] = useState("");

  const items = [
    { id: 1, category: "Situação-Problema", name: "Situação Problema" },
    { id: 2, category: "Estudo-Caso", name: "Estudo de Caso" },
    { id: 3, category: "Projeto", name: "Projeto" },
    { id: 4, category: "Pesquisa", name: "Pesquisa" },
    { id: 5, category: "Pesquisa", name: "Pesquia" },
    { id: 6, category: "Projeto-Integrador", name: "Projeto Integrador" },
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
              <img src={semesterIcon} alt="" />
              <h1>4 semestres</h1>
            </div>
            <div className="students">
              <img src={studentsIcon} alt="" />
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
            <img src={moreIcon} alt="" />
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
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
