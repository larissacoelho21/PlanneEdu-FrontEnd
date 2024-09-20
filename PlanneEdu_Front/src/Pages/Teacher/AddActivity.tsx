import { Clock3, Users } from "lucide-react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";
import "../../Css/Teacher/AddActivity.css";

export function AddActivity() {
  function InputField({
    id,
    label,
    type = "text",
    multiline = false, // Adiciona a opção de multiline
  }: {
    id: string;
    label: string;
    type?: string;
    multiline?: boolean;
  }) {
    const [isFilled, setIsFilled] = useState(false);

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setIsFilled(event.target.value !== "");
    };

    return (
      <div className="input-container">
        {multiline ? (
          <textarea
          className="input-add"
          id={id}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`; // Ajusta conforme o conteúdo
          }}
          rows={1} // Inicialmente com 1 linha
          style={{ overflow: "hidden" }} // Oculta a barra de rolagem
        />
        
        ) : (
          <input
            type={type}
            className={`input-add ${isFilled ? "filled" : ""}`}
            id={id}
            onChange={handleInputChange}
          />
        )}
        <label className={`label-add ${isFilled ? "filled" : ""}`} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }

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

      <div className="form-addactivity">
        <div className="dates-add">
          <div className="proposed-date">
            <label htmlFor="" className="label-date">Data Proposta</label>
            <input type="date" />
          </div>
          <div className="delivery-date">
            <label htmlFor="" className="label-date">Data de Entrega</label>
            <input type="date" />
          </div>
        </div>
        <InputField
          id="description"
          label="Descrição da Atividade"
          type="text" 
          multiline={true} 
        />
      </div>
    </section>
  );
}