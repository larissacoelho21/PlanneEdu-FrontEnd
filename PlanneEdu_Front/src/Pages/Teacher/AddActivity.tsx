 import { Clock3, Users } from "lucide-react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import React, { useEffect, useState } from "react";
import "../../Css/Teacher/AddActivity.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BaseUrl } from "../../Config/config";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { LargeButton } from "../../Components/LargeButton/LargeButton";
import { SelectMandatory } from "../../Components/Inputs/Mandatory/Select";
import { InfoClass } from "../../Components/Box/InfoClass/InfoClass";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(!!value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value !== "");
    if (onChange) onChange(event);
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
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </fieldset>
  );
}

/*  ce conexão com  Back-End */ /* 
interface Desafio {
  descricao: string;
  capacidadesBT: string[];
  capaSocio: string[];
} */

/* interface SA {
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
} */

// fim larissa

export function AddActivity() {
  // multiselect
  const options: SelectOption[] = [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Fifth", value: 5 },
  ];

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const [valueCapTecB, setValueCapTecB] = useState<SelectOption[]>([]);
  const [valueCapSoc, setValueCapSoc] = useState<SelectOption[]>([]);

  const [valueCapTecPop, setValueCapTecPop] = useState<SelectOption[]>([]);
  const [valueCapSocPop, setValueCapSocPop] = useState<SelectOption[]>([]);

  const [descricao, setDescricao] = useState<string>("");

  type Challenge = {
    descricao: string;
    capsTecBasP: (string | number)[];
    capsSocP: (string | number)[];
  };

  const createChallenge = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // verificando se todos os campos estão preenchidos
    if (
      valueCapTecPop.length === 0 ||
      valueCapSocPop.length === 0 ||
      !descricao
    ) {
      toast.error("Preencha todos os campos para continuar!");
      return;
    }

    const newChallenge = {
      descricao,
      capsTecBasP: valueCapTecPop.map((capTec) => capTec.value),
      capsSocP: valueCapSocPop.map((capSoc) => capSoc.value),
    };
    setChallenges([...challenges, newChallenge]);

    setDescricao("");
    setValueCapTecPop([]);
    setValueCapSocPop([]);

    toast.success("Desafio criado com sucesso!");

    togglePopUpChallenge();
  };



  // /multiselect

  // editando card de desafio
  const [editCardC, setEditCardC] = useState<number | null>(null);

  const startEditCard = (index: number) => {
    const cardToEdit = challenges[index];

    setEditCardC(index);
    setDescricao(cardToEdit.descricao);
    setValueCapTecPop(
        cardToEdit.capsTecBasP
            .map((value) => options.find((option) => option.value === value))
            .filter((option): option is SelectOption => option !== undefined)
    );
    setValueCapSocPop(
        cardToEdit.capsSocP
            .map((value) => options.find((option) => option.value === value))
            .filter((option): option is SelectOption => option !== undefined)
    );
};

useEffect(() => {
  if (editCardC !== null) {
      setShowPopUpChallenge(true);  
  }
}, [editCardC]);


  const editChallenge = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // validar se todos os campos estão preenchidos
    if (
      !descricao ||
      valueCapTecPop.length === 0 ||
      valueCapSocPop.length === 0
    ) {
      toast.error("Preencha todos os campos para continuar!");
      return;
    }

    // configuração do objeto de desafio atualizado
    const updatedChallenge: Challenge = {
      descricao: descricao,
      capsTecBasP: valueCapTecPop.map((capTec) => capTec.value),
      capsSocP: valueCapSocPop.map((capSoc) => capSoc.value),
    };

    // garantir que estamos no modo de edição
    if (editCardC !== null) {
      // atualizar o desafio existente na lista de desafios
      const updatedChallenges = [...challenges];
      updatedChallenges[editCardC] = updatedChallenge;
      setChallenges(updatedChallenges);

      toast.success("Desafio editado com sucesso!");

      // resetar os valores de edição
      setDescricao("");
      setValueCapTecPop([]);
      setValueCapSocPop([]);
      setEditCardC(null);
      togglePopUpChallenge();
    }
  };
  // /edit

  // deletar
  const deleteChallenge = (
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    index: number
  ) => {
    const updateData = data.filter((_, i) => i !== index);
    setData(updateData);
    toast.success("Desafio deletado com sucesso!");
  };

  const navigate = useNavigate();

  const [showPopUpChallenge, setShowPopUpChallenge] = useState(false);
  const togglePopUpChallenge = () => {
    setShowPopUpChallenge(!showPopUpChallenge);
    if (showPopUpChallenge) {
        setDescricao("");
        setValueCapTecPop([]);
        setValueCapSocPop([]);
        setEditCardC(null);
    }
};

  //lairssa

  /* Conectando com o Back */
  /*  const [formData, setFormData] = useState<SA>({
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
  }); */

  /* const handleAct = (event: React.FormEvent) => {
    event.preventDefault(); */ // Evita o reload da página

  /* fetch(`${BaseUrl}/sa/create`, { */
  //conectando com o computador que está rodando o back-end
  /* method: "POST", */ //method post de envio
  /*  headers: {
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
        console.log("sucesso", data); */
  // Após o cadastro bem-sucedido, redireciona e notifica o usuário
  /*  toast.success("Atividade cadastrada com sucesso!");
        navigate("/visualizaratvd"); */ // Exemplo de redirecionamento após sucesso
  /* })
      .catch((error) => {
        toast.error("Erro ao cadastrar Atividade, tente novamente.");
        console.error("Erro ao cadastrar SA: ", error);
      });
  }; */

  // Função para lidar com mudanças nos inputs
  /* const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; */

  // Função para adicionar um novo desafio
  /*  const adicionarDesafio = () => {
    setFormData({
      ...formData,
      desafios: [
        ...formData.desafios,
        { descricao: "", capacidadesBT: [], capaSocio: [] },
      ],
    });
  }; */

  // / larissa

  return (
    <section className="add-activity">
      <div className="start-add">
        <SubNavbar />
        <InfoClass
          course="Desenvolvimento de Sistemas"
          classCard="SESI"
          yearClass="2023"
          dateI="23/02/2023"
          dateT="18/12/2024"
          semester={4}
          students="35"
        />
      </div>

      <SelectMandatory
        label="Selecione a matéria referente a essa situação de aprendizagem"
        obs="uma matéria"
      />

      <form>
        <div className="form-addactivity">
          <div className="dates-add">
            <div className="proposed-date">
              <label htmlFor="" className="label-date">
                Data Proposta
              </label>
              <input
                type="date"
                name="dataProposta"
                /*  value={formData.dataProposta}
                onChange={handleChange} */
              />
            </div>
            <div className="delivery-date">
              <label htmlFor="" className="label-date">
                Data de Entrega
              </label>
              <input
                type="date"
                name="dataEntrega"
                /* value={formData.dataEntrega}
                onChange={handleChange} */
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
                onClick={(e) => e.preventDefault()}
                /* onClick={() =>
                  setFormData({
                    ...formData,
                    estrategiaApre: "situacao problema",
                  })
                } */
              >
                Situação Problema
              </button>
              <button
                value="estudos de caso"
                onClick={(e) => e.preventDefault()}
                /* onClick={() =>
                  setFormData({
                    ...formData,
                    estrategiaApre: "estudos de caso",
                  })
                } */
              >
                Estudo de Caso
              </button>
              <button
                value="projeto"
                onClick={(e) => e.preventDefault()}
                /* onClick={() =>
                  setFormData({ ...formData, estrategiaApre: "projeto" })
                } */
              >
                Projeto
              </button>
              <button
                value="projeto integrador"
                onClick={(e) => e.preventDefault()}
                /* onClick={() =>
                  setFormData({
                    ...formData,
                    estrategiaApre: "projeto integrador",
                  })
                } */
              >
                Projeto Integrador
              </button>
              <button
                value="pesquisa"
                onClick={(e) => e.preventDefault()}
                /*  onClick={() =>
                  setFormData({ ...formData, estrategiaApre: "pesquisa" })
                } */
              >
                Pesquisa
              </button>
            </div>
          </div>

          <div className="row">
            <div className="captecbasic">
              <label className="label-captecbasic">
                Capacidades Técnicas ou Básicas
              </label>
              <Multiselect
                options={options}
                value={valueCapTecB}
                onChange={setValueCapTecB}
                multiple
              />  
            </div>
            <div className="capsocio">
              <label className="label-capsocio">
                Capacidades Socioemocionais
              </label>
              <Multiselect
                options={options}
                value={valueCapSoc}
                onChange={setValueCapSoc}
                multiple
              />
            </div>
          </div>

          <div className="contextualization">
            <InputField
              id="contextualizacao"
              label="Contextualição"
              type="text"
              
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
                  togglePopUpChallenge();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          {challenges.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <div className="items-card-challenge">
                <h3>Desafio {index + 1}</h3>
                <p>Descrição: {challenge.descricao}</p>
                <p>Técnicas: {challenge.capsTecBasP.join(", ")}</p>
                <p>Socioemocionais: {challenge.capsSocP.join(", ")}</p>
              </div>
              <div className="buttons-card-challenge">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    startEditCard(index);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteChallenge(challenges, setChallenges, index);
                  }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}

          <div className="results-add">
            <InputField
              id="contextualization"
              label="Resultados Esperados"
              type="text"
              /* value={formData.resultados}
              onChange={handleChange} */
            />
          </div>

          <div className="buttons-save-atvd">
           <LargeButton
            text="Salvar informações"
           />
          </div>
        </div>
      </form>

      {/* PopUp */}
      {showPopUpChallenge && (
        <div className="overlay" onClick={togglePopUpChallenge}>
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
                <div className="description" style={{ cursor: "pointer" }}>
                  <InputField
                    id="description"
                    label="Descrição"
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="captecbasic-ch">
                  <label className="label-captecbasic">
                    Capacidades Técnicas ou Básicas
                  </label>
                  <Multiselect
                    options={options}
                    value={valueCapTecPop}
                    onChange={setValueCapTecPop}
                    multiple
                  />
                </div>
                <div className="capsocio-ch">
                  <label className="label-capsocio">
                    Capacidades Socioemocionais
                  </label>
                  <Multiselect
                    options={options}
                    value={valueCapSocPop}
                    onChange={setValueCapSocPop}
                    multiple
                  />
                </div>

                <div className="buttons-popup-challenge">
                  <button
                    onClick={(event) =>
                      editCardC === null
                        ? createChallenge(event)
                        : editChallenge(event)
                    }
                  >
                    {editCardC === null ? "Salvar" : "Salvar Edição"}
                  </button>
                  <button onClick={togglePopUpChallenge}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
