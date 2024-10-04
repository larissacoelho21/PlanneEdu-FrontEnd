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
