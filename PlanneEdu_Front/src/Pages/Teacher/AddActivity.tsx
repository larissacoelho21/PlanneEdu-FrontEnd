import { Clock3, Users } from "lucide-react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { useState } from "react";
import "../../Css/Teacher/AddActivity.css";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BaseUrl } from "../../Config/config";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
}

function InputField({ id, label, type = "text" }: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value !== "");
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="label-add" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-add"
        id={id}
        type={type}
        onChange={handleInputChange}
      />
    </fieldset>
  );
}

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

/* Interface conexão com  Back-End */
interface Desafio {
  descricao: string;
  capacidadesBT: string[];
  capaSocio: string[];
}

interface SA {
  dataProposta: string; // Usar string para datas, pois a conversão pode ser feita antes de enviar para o back-end
  dataEntrega: string;
  estrategiaApre:
    | "situacao problema"
    | "estudos de caso"
    | "projeto"
    | "projeto integrador"
    | "pesquisa";
  capacidadesBT: string[];
  capaSocio: string[];
  contextualizacao: string;
  desafios: Desafio[];
  resultados: string;
  user: string; // Supondo que seja o ID do usuário
  materia: string; // Supondo que seja o ID da matéria
}

export function AddActivity() {
  const navigate = useNavigate();

  const [value, setValue] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);

  const [showPopUpAdd, setShowPopUpAdd] = useState(false);
  const togglePopUpAdd = () => {
    setShowPopUpAdd(!showPopUpAdd);
  };

  interface Challenge {
    id: number;
    description: string;
    capTecBas: (string | number)[];
    capSoc: (string | number)[];
  }

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const createChallenge = () => {
    const newChallenge: Challenge = {
      id: challenges.length + 1,
      description: (document.getElementById("description") as HTMLInputElement)
        .value,
      capTecBas: value.map((cap) => cap.value),
      capSoc: value.map((cap) => cap.value),
    };

    setChallenges([...challenges, newChallenge]);
    togglePopUpAdd();

    setValue([options[0]]);
    setValue2([options[0]]);
  };

  /* Conectando com o Back */
  const [formData, setFormData] = useState<SA>({
    dataProposta: "",
    dataEntrega: "",
    estrategiaApre: "situacao problema",
    capacidadesBT: [],
    capaSocio: [],
    contextualizacao: "",
    desafios: [], // Lista de desafios
    resultados: "",
    user: "",
    materia: "",
  });

  const handleAct = (event: React.FormEvent) => {
    event.preventDefault(); // Evita o reload da página

    fetch(`${BaseUrl}/sa/create`, {
      //conectando com o computador que está rodando o back-end
      method: "POST", //method post de envio
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || "Erro ao cadastrar SA");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Após o cadastro bem-sucedido, redireciona e notifica o usuário
        toast.success("Atividade cadastrada com sucesso!");
        navigate("/visualizaratvd"); // Exemplo de redirecionamento após sucesso
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar Atividade, tente novamente.");
        console.error("Erro ao cadastrar SA: ", error);
      });
  };

  // Função para lidar com mudanças nos inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para adicionar um novo desafio
  const adicionarDesafio = () => {
    setFormData({
      ...formData,
      desafios: [
        ...formData.desafios,
        { descricao: "", capacidadesBT: [], capaSocio: [] },
      ],
    });
  };

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

      <form onSubmit={handleAct}>
        <div className="form-addactivity">
          <div className="dates-add">
            <div className="proposed-date">
              <label htmlFor="" className="label-date">
                Data Proposta
              </label>
              <input
                type="date"
                name="dataProposta"
                value={formData.dataProposta}
                onChange={handleChange}
              />
            </div>
            <div className="delivery-date">
              <label htmlFor="" className="label-date">
                Data de Entrega
              </label>
              <input
                type="date"
                name="dataEntrega"
                value={formData.dataEntrega}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="add-category">
            <div className="title-add">
              <h1>Estratégia de aprendizagem adotada</h1>
            </div>
            <div className="buttons-add">
              <button
                value="situacao problema"
                onClick={() =>
                  setFormData({
                    ...formData,
                    estrategiaApre: "situacao problema",
                  })
                }
              >
                Situação Problema
              </button>
              <button
                value="estudos de caso"
                onClick={() =>
                  setFormData({
                    ...formData,
                    estrategiaApre: "estudos de caso",
                  })
                }
              >
                Estudo de Caso
              </button>
              <button
                value="projeto"
                onClick={() =>
                  setFormData({ ...formData, estrategiaApre: "projeto" })
                }
              >
                Projeto
              </button>
              <button
                value="projeto integrador"
                onClick={() =>
                  setFormData({
                    ...formData,
                    estrategiaApre: "projeto integrador",
                  })
                }
              >
                Projeto Integrador
              </button>
              <button
                value="pesquisa"
                onClick={() =>
                  setFormData({ ...formData, estrategiaApre: "pesquisa" })
                }
              >
                Pesquisa
              </button>
              <button>Mostrar todos</button>
            </div>
          </div>

          <div className="row">
            <div className="captecbasic">
              <label className="label-captecbasic">
                Capacidades Técnicas ou Básicas
              </label>
              <Multiselect
                options={options}
                value={value}
                onChange={(o) => setValue(o)}
                multiple={true}
              />
            </div>
            <div className="capsocio">
              <label className="label-capsocio">
                Capacidades Socioemocionais
              </label>
              <Multiselect
                options={options}
                value={value2}
                onChange={(o) => setValue2(o)}
                multiple={true}
              />
            </div>
          </div>

          <div className="contextualization">
            <InputField
              id="contextualization"
              label="Contextualização"
              type="text"
              name="contextualizacao"
              value={formData.contextualizacao}
              onChange={handleChange}
            />
          </div>

          <div className="challenge">
            <div className="tittle-challenge">
              <h1>Desafios</h1>
            </div>
            <div className="button-add-challenge">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  togglePopUpAdd();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            {challenges.map((challenge) => (
              <div className="card-challenge">
                <div className="number-challenge">
                  <h1>Desafio {challenge.id}</h1>
                </div>
                <div className="view-description">
                  <h1>{challenge.description}</h1>
                </div>
                <div className="view-caps">
                  <div className="view-capbastec">
                    <h1>
                      Capacidades técnicas: {challenge.capTecBas.join(", ")}
                    </h1>
                  </div>
                  <div className="view-capsoc">
                    <h1>
                      Capacidades socioemocionais: {challenge.capSoc.join(", ")}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="results-add">
            <InputField
              id="contextualization"
              label="Resultados Esperados"
              type="text"
              name="resultados"
              value={formData.resultados}
              onChange={handleChange}
            />
          </div>

          <div className="buttons-save-atvd">
            <button type="submit">Salvar Alterações</button>
            <button type="button" onClick={() => navigate("/voltar")}>Voltar</button>
          </div>
        </div>
      </form>

      {/* PopUp */}
      {showPopUpAdd && (
        <div className="overlay" onClick={togglePopUpAdd}>
          <div className="popup-challenge" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content-challenge">
              <div className="texts-challenge">
                <h1>Desafio</h1>
                <h2>
                  Descreva o desafio e selecione as capacidades a serem
                  desenvolvidas.
                </h2>
              </div>

              <div className="forms-add-challenge">
                <div className="description">
                  <InputField id="description" label="Descrição" type="text" 
                    value={formData.contextualizacao}
                    onChange={handleChange}/>
                </div>
                <div className="captecbasic-ch">
                  <label className="label-captecbasic">
                    Capacidades Técnicas ou Básicas
                  </label>
                  <Multiselect
                    options={options}
                    value={value}
                    onChange={(o) => setValue(o)}
                    multiple={true}
                    onSelect={(selectedList) => setValue(selectedList)}
                    onRemove={(selectedList) => setValue(selectedList)}
                    displayValue="name"
                  />
                </div>
                <div className="capsocio-ch">
                  <label className="label-capsocio">
                    Capacidades Socioemocionais
                  </label>
                  <Multiselect
                    options={options}
                    value={value2}
                    onChange={(o) => setValue2(o)}
                    multiple={true}
                    onSelect={(selectedList) => setValue2(selectedList)}
                    onRemove={(selectedList) => setValue2(selectedList)}
                    displayValue="name"
                  />
                </div>

                <div className="buttons-popup-challenge">
                  <button onClick={createChallenge}>Criar Desafio</button>{" "}
                  <button onClick={togglePopUpAdd}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
