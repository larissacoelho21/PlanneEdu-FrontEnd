import { useEffect, useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { IntroForms } from "../../Components/IntroForms/IntroForms";

import "../../Css/Opp/AddUser.css"
import { Check } from "lucide-react";
import { RegisterUser } from "../../Services/Axios";

// TODO: Erro .500 no cadastro de usuário (back)
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
  onBackendChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  maxValue?: number;
}

/* função do componente `InputField` com as propriedades desestruturadas e valores padrão */
function InputField({
  id,
  label,
  type = "text",
  value = "",
  onChange,
  onWheel,
  onBackendChange,
  maxLength,
  maxValue,
}: InputFieldProps) {
  const [localValue, setLocalValue] = useState<string | number>(value);
  /* verificando se o campo está preenchido para aplicar estilos ou animações (booleano) */
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    setIsFilled(localValue !== "");
  }, [localValue]);

  /* função para gerenciar a mudança de valor do input */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: string = event.target.value;

    /* limita o comprimento do valor de entrada */
    if (maxLength && inputValue.length > maxLength) {
      /* corta o excedente */
      inputValue = inputValue.slice(0, maxLength);
    }

    /* converte para número se o tipo do input for "number" */
    if (type === "number") {
      let numericValue = inputValue !== "" ? parseFloat(inputValue) : ""; // Conversão para número

      /* verifica o valor máximo permitido */
      if (maxValue !== undefined && typeof numericValue === "number" && numericValue > maxValue) {
        numericValue = maxValue;
      }

      setLocalValue(numericValue);
    } else {
      setLocalValue(inputValue);
    }

    // Propaga o valor atualizado para o pai, se `onChange` estiver definido
    if (onChange) {
      event.target.value = inputValue;
      onChange(event);
    }
    if (onBackendChange) onBackendChange(event);
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="label-add-user" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-add-user"
        id={id}
        type={type}
        value={localValue}
        onChange={handleInputChange}
        onWheel={onWheel}
      />
    </fieldset>
  );
}

export function AddUser() {
  /* Função Back-End */

  const [nome, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [area, setArea] = useState("");
  const [nif, setNif] = useState("");
  const [password, setPassword] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const BackAddUser = async (event: React.FormEvent) => {
    event.preventDefault();

    // Chama diretamente a função `registerUser`
    await RegisterUser({
      nome,
      sobrenome,
      area,
      nif,
      password,
      nivelAcesso,
      email,
      telefone,
    });
  };


  return (
    <section className="AddUsuario">
      <SubNavbar />
      <div className="title-addcourse" style={{ marginBottom: "5%" }}>
        <IntroForms
          titleText="Adicione um novo usuário"
          subtitleText="Todos os campos são obrigatórios"
        />
      </div>

      <form onSubmit={BackAddUser}>
        <div className="form-adduser">
          <div className="input-field">
            <InputField
              label="Nome"
              type="text"
              id="nome-user"
              value={nome}
              onBackendChange={(event) => setName(event.target.value)}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          <div className="input-field">
            <InputField
              label="Sobrenome"
              type="text"
              id="sobrenome-user"
              value={sobrenome}
              onBackendChange={(event) => setSobrenome(event.target.value)}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          <div className="input-field">
            <label className="label">Nível de acesso</label>
            <select name="nivel-acesso"
            value={nivelAcesso}
            onChange={(event) => setNivelAcesso(event.target.value)}
            >
              <option value="" disabled selected></option>
              <option value="docente">Docente</option>
              <option value="Opp">Opp</option>
            </select>
          </div>

          <div className="adduser-row">
            <div className="input-r">
              <InputField
                label="NIF"
                type="number"
                id="nif"
                value={nif}
                onBackendChange={(event) => setNif(event.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="input-r">
              <InputField
                label="Senha - 8 digitos "
                type="password"
                id="senha-user"
                value={password}
                onBackendChange={(event) => setPassword(event.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="input-r">
              <InputField
                label="Área de atuação"
                type="text"
                id="area-user"
                value={area}
                onBackendChange={(event) => setArea(event.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>

          </div>
          <div className="add-contact">
            <div className="title-adduser">
              <p>
                Opções de contato
              </p>
            </div>

            <div className="input-field">
              <InputField
                label="Email"
                type="email"
                id="email-user"
                value={email}
                onBackendChange={(event) => setEmail(event.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="input-field">
              <InputField
                label="Telefone"
                type="number"
                id="telefone-user"
                value={telefone}
                onBackendChange={(event) => setTelefone(event.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="save" type="submit">
            <Check />
            Salvar alterações
          </button>
        </div>
      </form>
    </section>
  );
}
