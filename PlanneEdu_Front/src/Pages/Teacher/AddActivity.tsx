import { Clock3, Users } from "lucide-react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";

export function AddActivity() {
  return (
    <section className="add-activity">
      <div className="start-add">
        <SubNavbar />
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
      </div>

      <div className="forms-add-activity">
        <div className="proposed-date">
          <input type="date" name="" id="dateProposed"/>
          <label htmlFor="dateProposed">Data Proposta</label>
        </div>
        <div className="delivery-date">
          <input type="date" name="" id="dateDelivery"/>
          <label htmlFor="dateDelivery">Data de Entrega</label>
        </div>
      </div>
    </section>
  );
}
