import { Link } from "react-router-dom";
import BackgroundLogin from "../assets/background-login.svg";
import Computer from "../assets/computer.svg";
import Logo from "../assets/logo.svg";

import "../Css/Login.css";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

/* Página de Login */
export function Login() {
  // Fazendo a senha ser ocultada e mostrada
  // Fazendo a verificação se ela está oculta ou não
  const [isShow, setIsShow] = useState(false);

  const [nifValue, setNifValue] = useState("");

  const handlePassword = () => setIsShow(!isShow);

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
          <form>
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
                type="number"
                placeholder="Insira seu NIF"
                value={nifValue}
                max={8}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value.length < 9) {
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
    </section>
  );
}
