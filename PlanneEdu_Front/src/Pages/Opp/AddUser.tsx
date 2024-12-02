import { useEffect, useState } from "react";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import { IntroForms } from "../../Components/IntroForms/IntroForms";

import "../../Css/Opp/AddUser.css";
import { Check } from "lucide-react";
import { RegisterUser } from "../../Services/Axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";

// TODO: Erro .500 no cadastro de usuário (back)

interface InputFieldProps {
  id: string;
  name?: string;
  label: string;
  type?: string;
  value?: string | number | null;
  options?: { value: string | number; label: string }[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
  onBackendChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  maxLength?: number;
  minLength?: number;
  maxValue?: number;
}

function InputField({
  id,
  name,
  label,
  type = "text",
  value = "",
  options = [],
  onChange,
  onWheel,
  onBackendChange,
  maxLength,
  minLength,
  maxValue,
  mask,
}: InputFieldProps & { mask?: string }) {
  const [localValue, setLocalValue] = useState<string | number | null>(value); // Estado local
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(localValue !== "" && localValue !== null);
  }, [localValue]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let inputValue = event.target.value;

    /* limitando o máximo de caracteres */
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    /* validação para inputs numéricos */
  if (type === "number") {
    const numericValue = inputValue !== "" ? parseFloat(inputValue) : NaN;

    /* validando se é um número válido antes da comparação */
    if (maxValue !== undefined && !isNaN(numericValue) && numericValue > maxValue) {
      toast.error(`O valor máximo permitido é composto por ${maxLength} caracteres. Tente novamente com um valor válido!`);
      return;
    }

    /* tranformando em número */
    setLocalValue(numericValue);
  } else {
    /* validação dos textos, com base em seu comprimento */
    if (maxLength && inputValue.length > maxLength) {
      toast.error(`Campo com máximo de ${maxLength} caracteres. Tente novamente com um valor válido!`);
      return;
    }

    /* if (minLength && inputValue.length < minLength) {
      toast.error(`Campo com mínimo de ${minLength} caracteres. Tente novamente com um valor válido!`);
    } */

    /* transformando em string */
    setLocalValue(inputValue);
  }

    /* propagação do valor atualizado para o pai */
    if (onChange) {
      event.target.value = inputValue;
      onChange(event);
    }
    if (onBackendChange) onBackendChange(event);
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label htmlFor={id} className="label-add-user">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={localValue ?? ""}
          onChange={handleInputChange}
          className="input-add-user"
        >
          <option value="" disabled></option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : mask ? (
        <ReactInputMask
          id={id}
          name={name}
          mask={mask}
          value={localValue ?? ""}
          onChange={handleInputChange}
          className="input-add-user"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={localValue ?? ""}
          onChange={handleInputChange}
          onWheel={type === "number" ? onWheel : undefined}
          autoComplete="off"
          className="input-add-user"
        />
      )}
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

  const navigate = useNavigate();

  const BackAddUser = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nome || !sobrenome || !email || !password || !nivelAcesso) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    // Chama diretamente a função `registerUser`
    try {
      const response = await RegisterUser({
        nome,
        sobrenome,
        area,
        nif,
        password,
        nivelAcesso,
        email,
        telefone,
      });

      navigate("/manageteachers");
      console.log(response);
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  const nivelAcessoOptions = [
    { value: "docente", label: "Docente" },
    { value: "opp", label: "OPP" },
  ];

  const areasAtuacao = [
    { value: "infoNcomu", label: "Informação e comunicação" },
    { value: "controNprocessos", label: "Controle e Processos Industriais" },
    { value: "gestNnego", label: "Gestão e Negócios" },
  ];

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
            <div className="select-field">
              <InputField
                id="select-field"
                name="detailAssigned"
                label="Atribuído a:"
                type="select"
                options={nivelAcessoOptions}
                value={nivelAcesso}
                onChange={(event) => setNivelAcesso(event.target.value)}
              />
            </div>
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
                maxLength={10}
                maxValue={999999999}
              />
            </div>
            <div className="input-r">
              <InputField
                label="Senha"
                type="password"
                id="senha-user"
                value={password}
                onBackendChange={(event) => setPassword(event.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            <div className="input-r">
              <div className="select-field">
                <InputField
                  id="select-field"
                  name="detailAssigned"
                  label="Área de atuação:"
                  type="select"
                  options={areasAtuacao}
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="add-contact">
            <div className="title-adduser">
              <p>Opções de contato</p>
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
                type="text"
                id="telefone-user"
                value={telefone}
                mask="(99) 99999-9999"
                onBackendChange={(event) => setTelefone(event.target.value)}
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
