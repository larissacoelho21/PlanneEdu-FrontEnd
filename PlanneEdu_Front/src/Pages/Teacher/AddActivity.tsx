import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import React, { useEffect, useState } from "react";
import "../../Css/Teacher/AddActivity.css";

/* import { BaseUrl } from "../../Config/config"; */
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Multiselect,
  SelectOption,
} from "../../Components/Multiselect/Multiselect";
import { LargeButton } from "../../Components/Buttons/LargeButton/LargeButton";
import { InfoClass } from "../../Components/Box/InfoClass/InfoClass";
import { InputField } from "../../Components/Inputs/InputField/Field/InputField";
import { ButtonAdd } from "../../Components/Buttons/More/More";
import { SmallButton } from "../../Components/Buttons/SmallButton/SmallButton";
import ReactInputMask from "react-input-mask";

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
    {
      label:
        "1. Identificar as características de programação backend em ambiente web",
      value: 1,
    },
    {
      label:
        "1.1 Preparar ambiente necessário ao desenvolvimento back-end para plataforma web",
      value: 2,
    },
    {
      label:
        "1.1 Preparar ambiente necessário ao desenvolvimento back-end para plataforma web",
      value: 3,
    },
    {
      label:
        "1.1 Preparar ambiente necessário ao desenvolvimento back-end para plataforma web",
      value: 4,
    },
    {
      label:
        "1.1 Preparar ambiente necessário ao desenvolvimento back-end para plataforma web",
      value: 5,
    },
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
      descricao: descricao,
      capsTecBasP: valueCapTecPop.map((capTecBas) => capTecBas.value),
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

  // função back
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [proposedDate, setProposedDate] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [capTecBas, setCapTecBas] = useState<string>(""); //nao sabia como colocar, coloquei só pra testa
  const [capSocE, setCapSocE] = useState<string>(""); //nao sabia como colocar, coloquei só pra testa
  const [contextualization, setContextualization] = useState("");
  const [results, setResults] = useState("");

  //input de data

  const convertToISO = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const validateDates = (startISO: string, endISO: string) => {
    const start = new Date(startISO);
    const end = new Date(endISO);

    if (end < start) {
      toast.error(
        "A data de entrega não pode ser menor que a data proposta! Tente novamente com uma data válida."
      );
      return false;
    } else {
      return true;
    }
  };

  /* converte para o formato ISO */
  const startDateISO = convertToISO(proposedDate);
  const endDateISO = convertToISO(deliveryDate);

  if (!startDateISO || !endDateISO) {
    toast.error("Formato de data inválido! Use o formato DD/MM/AAAA.");
    return;
  }

  if (!validateDates(startDateISO, endDateISO)) {
    return;
  }

  // validação para selecionar matéria
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!selectedSubject) {
      toast.error("Selecione uma matéria para continuar!");
      return;
    }

    toast.success("Situação de aprendizagem criada com sucesso!")
  }

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

      <div className="select-planne-course">
        <label htmlFor="" className="label-select">
          Selecione uma matéria
        </label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="input-all"
        >
          <option value=""></option>
        </select>
        <h2>* Obs: Para continuar você deve selecionar uma matéria</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-addactivity">
          <div className="dates-add">
            <div className="proposed-date">
              <label htmlFor="" className="label-date">
                Data Proposta
              </label>
              <ReactInputMask
                className="input-all"
                type="text"
                mask="99/99/9999"
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                disabled={!selectedSubject}
              />
              </div>
            <div className="delivery-date">
              <label htmlFor="" className="label-date">
                Data de Entrega
              </label>
              <ReactInputMask
                className="input-all"
                type="text"
                mask="99/99/9999"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                disabled={!selectedSubject}
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

          <InputField
            id="contextualization"
            label="Contextualização"
            type="textarea"
            value={contextualization}
            onChange={(e) => setContextualization(e.target.value)}
          />

          <div className="challenge">
            <div className="tittle-challenge">
              <h1>Desafios</h1>
            </div>
            <ButtonAdd
              onClick={(e) => {
                e.preventDefault();
                togglePopUpChallenge();
              }}
            />
          </div>

          {challenges.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <div className="items-card-challenge">
                <h3>Desafio {index + 1}</h3>
                <p><span style={{fontWeight: "700"}}>Descrição:</span> {challenge.descricao}</p>
                <p>
                <span style={{fontWeight: "700"}}>Técnicas:</span>{" "}
                  {challenge.capsTecBasP
                    .map(
                      (value) =>
                        options.find((option) => option.value === value)?.label
                    )
                    .join(", ")}
                </p>
                <p>
                <span style={{fontWeight: "700"}}>Socioemocionais:</span>{" "}
                  {challenge.capsSocP
                    .map(
                      (value) =>
                        options.find((option) => option.value === value)?.label
                    )
                    .join(", ")}
                </p>
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
              label="Contextualização"
              type="textarea"
              value={results}
              onChange={(e) => setResults(e.target.value)}
            />
          </div>

          <div className="buttons-save-atvd">
            <LargeButton text="Salvar informações" />
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
                    id="contextualization"
                    label="Descrição"
                    type="textarea"
                    value={contextualization}
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
                  <SmallButton
                    onClick={(event) =>
                      editCardC === null
                        ? createChallenge(event)
                        : editChallenge(event)
                    }
                    text={editCardC === null ? "Salvar" : "Salvar Edição"}
                  />
                  <SmallButton onClick={togglePopUpChallenge} text="Cancelar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
