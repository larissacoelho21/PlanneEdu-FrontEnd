import { useState } from "react";

// Definimos a interface Materia para tipar cada objeto de matéria
interface Materia {
  nome: string;
  cargaHoraria: string;
}

// Definimos o tipo do estado materiasPorSemestre, que será um objeto
// com chaves como "1º Semestre", "2º Semestre", etc. e valores como arrays de Materia
interface MateriasPorSemestre {
  "1º Semestre": Materia[];
  "2º Semestre": Materia[];
  "3º Semestre": Materia[];
  "4º Semestre": Materia[];
}

// Chaves permitidas para semestre
type Semestre = "1º Semestre" | "2º Semestre" | "3º Semestre" | "4º Semestre";

export function AddMateria() {
  // Estado para armazenar as matérias separadas por semestre
  const [materiasPorSemestre, setMateriasPorSemestre] =
    useState<MateriasPorSemestre>({
      "1º Semestre": [{ nome: "", cargaHoraria: "" }],
      "2º Semestre": [{ nome: "", cargaHoraria: "" }],
      "3º Semestre": [{ nome: "", cargaHoraria: "" }],
      "4º Semestre": [{ nome: "", cargaHoraria: "" }],
    });

  // Função chamada quando o botão "Adicionar matéria" é clicado
  const adicionarMateria = (semestre: Semestre) => {
    setMateriasPorSemestre((prevState) => ({
      ...prevState,
      [semestre]: [
        ...prevState[semestre],
        { nome: "", cargaHoraria: "" },
      ],
    }));
  };

  // Função para lidar com a mudança de valor nos inputs
  const handleInputChange = (
    semestre: Semestre,
    index: number,
    campo: keyof Materia,
    valor: string
  ) => {
    const novasMaterias = [...materiasPorSemestre[semestre]];
    novasMaterias[index] = {
      ...novasMaterias[index],
      [campo]: valor,
    };
    setMateriasPorSemestre((prevState) => ({
      ...prevState,
      [semestre]: novasMaterias,
    }));
  };

  // Função para renderizar os inputs para um semestre específico
  const renderSemestre = (semestre: Semestre) => (
    <div key={semestre} className="semestre-container">
      <h3>{semestre}</h3>

      {materiasPorSemestre[semestre].map((materia, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Matéria"
            value={materia.nome}
            onChange={(e) =>
              handleInputChange(semestre, index, "nome", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Carga horária"
            value={materia.cargaHoraria}
            onChange={(e) =>
              handleInputChange(semestre, index, "cargaHoraria", e.target.value)
            }
          />
        </div>
      ))}

      <button type="button" className="btn-adicionar" onClick={() => adicionarMateria(semestre)}>
        Adicionar matéria
      </button>
    </div>
  );

  return (
    <div className="container">
      <h2>Grade Horária</h2>
      {["1º Semestre", "2º Semestre", "3º Semestre", "4º Semestre"].map(
        (semestre) => renderSemestre(semestre as Semestre)
      )}
    </div>
  );
}

