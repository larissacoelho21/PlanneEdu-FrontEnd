import { Link, useNavigate } from "react-router-dom";
/* import BackgroundLogin from "../assets/background-login.svg";*/
import BackgroundLogin from "../assets/reca.png";
import Computer from "../assets/computer.svg";
import Logo from "../assets/logo.svg";
import Forma from "../assets/forma-azul.svg";
import LogoWhite from "../assets/logoWhite.svg";

import "../Css/Login.css";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { login } from "../Services/Axios";
import { toast } from "sonner";

/* Página de Login */
export function Login() {
  // Fazendo a senha ser ocultada e mostrada
  // Fazendo a verificação se ela está oculta ou não
  const [isShow, setIsShow] = useState(false);

  const [nifValue, setNifValue] = useState(""); /* Capturando o NIF */

  const [passwordValue, setPasswordValue] =
    useState(""); /* Capturando a senha */

  const handlePassword = () => setIsShow(!isShow);

  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita o reload da página

    try {
      // Chama a função de login do axios
      const data = await login(nifValue, passwordValue);
      // Armazenar o nome do usuário no localStorage
      localStorage.setItem("userName", data.user.nome);
      localStorage.setItem("Authorization", data.token);
      console.log(localStorage);
      if (data.user.defaultUser === true) {
        //identifcando se o usuário é padrão
        navigate("/profile"); // Redireciona para a página de perfil
        toast.info("Por favor, atualize suas informações.");
      }
      // 2. Verificar o nível de acesso
      else if (data.user.nivelAcesso === "opp") {
        navigate("/homeopp"); // Redireciona para a página do OPP
        toast.success("Bem-vindo, OPP!");
      } else if (data.user.nivelAcesso === "docente") {
        navigate("/homeprofessor"); // Redireciona para a página do professor
        toast.success("Bem-vindo, Docente!");
      } else {
        // Caso a role não seja reconhecida
        toast.error("Nível de acesso desconhecido."); //alert
      }
    } catch (error: any) {
      toast.error(error.message || "NIF ou senha incorretos, tente novamente");
      console.error("Erro ao carregar dados dos usuários: ", error);
    }
  };
  return (
    <section className="login">
      {/* Background - forma + ilustração */}
      <div className="images">
        <div className="container">
          <img className="back" src={BackgroundLogin} alt="" /> {/* Forma */}
          <img className="computer" src={Computer} alt="" /> {/* Ilustração */}
        </div>
      </div>

      <div className="right-side">
        {" "}
        {/* Definindo a segunda parte da tela */}
        <div className="logo">
          {" "}
          {/* Logo do projeto */}
          <img src={Logo} alt="" />
        </div>
        <div className="text">
          <form onSubmit={handleLogin}>
            <div className="forms">
              {" "}
              {/* Títulos */}
              <h2>
                Sua ferramenta para <br />
                um ensino mais eficiente
              </h2>
              <p>Faça login para continuar</p>
            </div>

            <div className="inputs">
              {" "}
              {/* Input */}
              <input
                className="input"
                type="text"
                placeholder="Insira seu NIF"
                value={nifValue}
                max={10}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value.toString().length <= 10) {
                    setNifValue(value);
                  }
                }}
                required
              />
              <label className="inputPassword">
                <input
                  className="input-password"
                  type={isShow ? "text" : "password"}
                  placeholder="Insira sua senha"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)} // Captura a senha
                  required
                />
                <button onClick={handlePassword} type="button">
                  {isShow && <Eye size={18} />}
                  {!isShow && <EyeOff size={18} />}
                </button>
              </label>
            </div>

            <div className="password">
              {" "}
              {/* Link caso esqueça senha */}
              <Link to="/redefinicaosenha">
                Esqueceu sua senha? Clique aqui.
              </Link>
            </div>

            <div className="button-login">
              <button type="submit" style={{ cursor: "pointer" }}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="login-mobile">
        
        <div className="top">
          <div className="login-img">
            <img id="forma" src={Forma} alt="" />
          </div>
          <div className="login-logo">
            <img src={LogoWhite} alt="" />
          </div>
          <div className="login-info">
            <h1>Sua ferramenta para um ensino mais eficiente</h1>
            <p>Faça login para continuar</p>
          </div>
        </div>

        <div className="bottom">
          <div className="inputs">
            {" "}
            {/* Input */}
            <input
              className="input"
              type="text"
              placeholder="Insira seu NIF"
              value={nifValue}
              max={10}
              onChange={(event) => {
                const value = event.target.value;
                if (value.toString().length <= 10) {
                  setNifValue(value);
                }
              }}
              required
            />
            <label className="inputPassword">
              <input
                className="input-password"
                type={isShow ? "text" : "password"}
                placeholder="Insira sua senha"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)} // Captura a senha
                required
              />
              <button onClick={handlePassword} type="button">
                {isShow && <Eye size={18} />}
                {!isShow && <EyeOff size={18} />}
              </button>
            </label>
          </div>

          <div className="password">
            {" "}
            {/* Link caso esqueça senha */}
            <Link to="/redefinicaosenha">Esqueceu sua senha? Clique aqui.</Link>
          </div>

          <div className="button-login">
            <button type="submit" style={{ cursor: "pointer" }}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
