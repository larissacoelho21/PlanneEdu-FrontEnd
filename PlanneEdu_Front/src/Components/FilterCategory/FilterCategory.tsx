import "../FilterCategory/Filter.css";

import { useState } from "react";

export function FilterCategory() {
  const categories = [
    "Mostrar Tudo",
    "Informação e Comunicação",
    "Controle e Processos Industriais",
    "Gestão e Negócios"
  ];

  // variável para armazenar as categorias selecionadas
  const [selectedCategory, setSelectedCategory] = useState("Mostrar Tudo");

  const itemsFilter = [
    {
      id: 1,
      name: "Item 1",
      category: "Informação e comunicação",
    },
    {
      id: 2,
      name: "Item 2",
      category: "Controle e Processos Industriais",
    },
    {
      id: 3,
      name: "Item 3",
      category: "Gestão e Negócios",
    },
    {
      id: 4,
      name: "Item 4",
      category: "Gestão e Negócios",
    },
    {
      id: 5,
      name: "Item 5",
      category: "Controle e Processos Industriais",
    },
  ];

  // includes determina se uma string tem outra string dentro
  const handleCheckbox = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredItems =
    selectedCategory === "Mostrar Tudo"
      ? itemsFilter
      : itemsFilter.filter((item) => item.category === selectedCategory);

  return (
    <div className="filterCheck">
      <div className="itemsCheck">
        <div className="tittleCheck">
          <h2>Filtre por categoria</h2>
        </div>
        <div className="categoriesCheck">
          {categories.map((category) => (
            <label
              key={category}
              className="labelCheck"
              style={{ cursor: "pointer" }}
            >
              <input
                style={{ cursor: "pointer" }}
                type="checkbox"
                className="inputCheck"
                checked={selectedCategory.includes(category)}
                onChange={() => handleCheckbox(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
