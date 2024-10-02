/* import { useState } from "react";

interface Capacidade {
  descricao: string;
}

interface CapacidadesPorTipo {
  "Capacidades Básicas": Capacidade[];
  "Capacidades técnicas": Capacidade[];
  "Capacidades socioemocionais": Capacidade[];
}

type TipoCapacidade =
  | "Capacidades Básicas"
  | "Capacidades técnicas"
  | "Capacidades socioemocionais";

export function Competencias() {
  // armazenando competencias separadas por classificacao
  const [capacidadesPorTipo, setcapacidadesPorTipo] =
    useState<CapacidadesPorTipo>({
      "Capacidades Básicas": [],
      "Capacidades técnicas": [],
      "Capacidades socioemocionais": [],
    });

  //fuçao para o botao "+"
  const addCapacidade = (tipo: TipoCapacidade) => {
    setcapacidadesPorTipo((prevState) => ({
      ...prevState,
      [tipo]: [...prevState[tipo], { descricao: "" }],
    }));
  };

  //lidando com a mudança de valor
  const handleCompetencia = (
    tipo: TipoCapacidade,
    index: number,
    valor: string
  ) => {
    const newCompetencia = [...capacidadesPorTipo[tipo]];
    newCompetencia[index] = {
      ...newCompetencia[index],
      descricao: valor,
    };
    setcapacidadesPorTipo((prevState) => ({
      ...prevState,
      [tipo]: newCompetencia,
    }));
  };

  const renderCapacidades = (tipo: TipoCapacidade) => (
    <div key={tipo} className="competencias">
      {capacidadesPorTipo[tipo] && capacidadesPorTipo[tipo].length > 0 ? (
        capacidadesPorTipo[tipo].map((capacidade, index) => (
          <div key={index} className="capacidade-row">
            <input
              type="text"
              placeholder="Descrição da capacidade"
              value={capacidade.descricao}
              onChange={(e) =>
                handleCompetencia(tipo, index, e.target.value)
              }
              className="input-capacidade"
            />
          </div>
        ))
      ) : (
        <p>Nenhuma capacidade adicionada ainda.</p>
      )}
      <button onClick={() => addCapacidade(tipo)}>+</button>
    </div>
  );
  return (
    <div className="competencias">
       {["Capacidades básicas", "Capacidades técnicas", "Capacidades socioemocionais"].map(
        (tipo) => renderCapacidades(tipo as TipoCapacidade)
      )}
    </div>
  );
}
 */

import React, { useState } from 'react';

interface Capacidade {
  descricao: string;
}

export function Competencias() {
  // Estados para cada tipo de capacidade
  const [capBasicas, setCapBasicas] = useState<Capacidade[]>([{ descricao: '' }]);
  const [capTecnicas, setCapTecnicas] = useState<Capacidade[]>([{ descricao: '' }]);
  const [capSocioemocionais, setCapSocioemocionais] = useState<Capacidade[]>([{ descricao: '' }]);

  // Função para adicionar uma capacidade a um dos tipos
  const adicionarCapacidade = (setCapacidade: React.Dispatch<React.SetStateAction<Capacidade[]>>) => {
    setCapacidade(prevState => [...prevState, { descricao: '' }]);
  };

  // Função para lidar com a mudança no input de capacidade
  const handleCompetencia = (
    index: number,
    valor: string,
    setCapacidade: React.Dispatch<React.SetStateAction<Capacidade[]>>
  ) => {
    setCapacidade(prevState => {
      const novasCapacidades = [...prevState];
      novasCapacidades[index] = { descricao: valor };
      return novasCapacidades;
    });
  };

  // Renderizar capacidades de um determinado tipo
  const renderCapacidades = (
    capacidades: Capacidade[],
    setCapacidade: React.Dispatch<React.SetStateAction<Capacidade[]>>,
    placeholder: string
  ) => {
    return capacidades.map((capacidade, index) => (
      <input
        key={index}
        type="text"
        placeholder={placeholder}
        value={capacidade.descricao}
        onChange={e => handleCompetencia(index, e.target.value, setCapacidade)}
      />
    ));
  };

  return (
    <div>
      <h3>Competências Específicas e Socioemocionais</h3>

      {/* Capacidades básicas */}
      <div className="capacidade">
        {renderCapacidades(capBasicas, setCapBasicas, 'Capacidade básica')}
        <button type="button" onClick={() => adicionarCapacidade(setCapBasicas)}>
          +
        </button>
      </div>

      {/* Capacidades técnicas */}
      <div className="capacidade">
        {renderCapacidades(capTecnicas, setCapTecnicas, 'Capacidade técnica')}
        <button type="button" onClick={() => adicionarCapacidade(setCapTecnicas)}>
          +
        </button>
      </div>

      {/* Capacidades socioemocionais */}
      <div className="capacidade">
        {renderCapacidades(capSocioemocionais, setCapSocioemocionais, 'Capacidade socioemocional')}
        <button type="button" onClick={() => adicionarCapacidade(setCapSocioemocionais)}>
          + 
        </button>
      </div>
    </div>
  );
}
