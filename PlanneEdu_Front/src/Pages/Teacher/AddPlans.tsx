import "../../Css/Teacher/AddPlans.css";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { CodeXml } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { BookMarked } from "lucide-react";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { useState } from "react";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

export function AddPlans() {
  const [value, setValue] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);
  const [value3, setValue3] = useState<SelectOption[]>([options[0]]);
  const [value4, setValue4] = useState<SelectOption[]>([options[0]]);

  return (
    <main>
      <SubNavbar />
      <div className="card-info-disc">
        <h2>Programação WEB Front-End</h2>

        <div className="tag-course">
          <CodeXml />
          <p>Desenvolvimento de Sistemas</p>
        </div>

        <div className="Info">
          <div className="Teacher">
            <GraduationCap />
            <p>Arthur Rosa</p>
          </div>
          <div className="Class">
            <BookMarked />
            <p>Manhã 2023</p>
          </div>
        </div>
      </div>

      <div className="form">
        <div className="inputt">
          <label>Nome</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="inputt">
          <label>Unidade Curricular</label>
          <input type="text" name="uc" id="uc" />
        </div>
        <div className="inputt">
          <label>Docente</label>
          <input type="text" name="docent" id="docent" />
        </div>
        <div className="row">
          <div className="inputt">
            <label>Carga Horária</label>
            <input type="number" name="horas" id="horas" />
          </div>
          <div className="inputt">
            <label>Quantidade de Aulas</label>
            <input type="number" name="aulas" id="aulas" />
          </div>
          <div className="inputt">
            <label>Semestre</label>
            <input type="number" name="semestre" id="semestre" />
          </div>
          <div className="inputt">
            <label>Ano</label>
            <input type="number" name="ano" id="ano" />
          </div>
        </div>
        <div className="inputt">
          <label>Descrição da Unidade de Competência</label>
          <input type="text" name="desc-uc" id="desc-uc" />
        </div>
        <div className="inputt">
          <label>Objetivo da Unidade Curricular</label>
          <input type="text" name="obj-uc" id="obj-uc" />
        </div>
        <div className="inputt">
          <label>Turma</label>
          <input type="text" name="turma" id="turma" />
        </div>

        <h3>
          Estratégias para o desenvolvimento da situação de aprendizagem e
          planejamento da intervenção mediadora
        </h3>

        <div className="row">
          <div className="inputt">
            <label>Data</label>
            <input type="number" name="horas" id="horas" />
          </div>
          <div className="inputt">
            <label>N° S.A</label>
            <input type="number" name="n-sa" id="n-sa" />
          </div>
          <div className="inputt">
            <label>Carga Horária</label>
            <input type="number" name="hrs" id="hrs" />
          </div>
        </div>

        <div className="row">
          <div className="captecsocio">
            <label>Capacidades Técnicas e Socioemocionais</label>
            <Multiselect
              options={options}
              value={value}
              onChange={(o) => setValue(o)}
              multiple={true}
            />
          </div>
          <div className="caprelacionadas">
            <label>Capacidades Relacionadas</label>
            <Multiselect
              options={options}
              value={value2}
              onChange={(o) => setValue2(o)}
              multiple={true}
            />
          </div>
        </div>

        <div className="row">
          <div className="captecsocio">
            <label>Capacidades Técnicas e Socioemocionais</label>
            <Multiselect
              options={options}
              value={value3}
              onChange={(o) => setValue3(o)}
              multiple={true}
            />
          </div>
          <div className="caprelacionadas">
            <label>Capacidades Relacionadas</label>
            <Multiselect
              options={options}
              value={value4}
              onChange={(o) => setValue4(o)}
              multiple={true}
            />
          </div>
        </div>

        <div className="inputt">
          <label>Perguntas Mediadoras</label>
          <input type="text" name="pergmedia" id="pergmedia" />
        </div>

        <h3>Estratégias de avaliação de aprendizagem</h3>

        <div className="inputt">
          <label>Instrumentos de Avaliação</label>
          <input type="text" name="inst-avalia" id="inst-avalia" />
        </div>

        <div className="criterios">
          <table>
            <tr>
              <th>Critérios de Avalição</th>
              <th>Crítico (C) ou Desejável (D)</th>
            </tr>
          </table>
        </div>
      </div>
    </main>
  );
}