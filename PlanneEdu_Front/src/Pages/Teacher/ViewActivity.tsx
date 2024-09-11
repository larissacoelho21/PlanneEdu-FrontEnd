

import semesterIcon from "../../assets/clock.svg";
import studentsIcon from "../../assets/peoples.svg";
import moreIcon from "../../assets/more.svg";

import "../../Css/Teacher/ViewActivity.css";
import { Link } from "react-router-dom";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";

export function ViewActivity() {
  return (

    <section className="visualizar-atividade">
        <SubNavbar/>
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
    </section>
  );
}
