import { useState } from "react";
import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword";
import FormaBottom from "../assets/forma_certa.svg";
import Logo from "../assets/logo.svg";

import "../Css/PasswordReset.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { postEmail } from "../Services/Axios";

/* Redefinição de senha */
export function PasswordReset() {
 
    const [emailValue, setEmailValue] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
  
    const handleEmailSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      const toastId = toast.loading("Aguarde, estamos enviando seu e-mail...");
      postEmail(emailValue, setIsLoading, navigate, toastId);
    };

  return (
    <section className="PasswordReset">
      <div className="background">
        <BackgroundPassword /> {/* Componente do fundo forma + saída + logo */}
      </div>
      <div className="reset-info">
        {" "}
        {/* Div maior - não possue css */}
        <div className="title-text">
          <div className="title">
            {" "}
            {/* Títulos */}
            <h2>Redefinição de senha</h2>
            <p>
              Informe seu e-mail abaixo, e enviaremos as instruções <br />
              necessárias para que você possa redefinir sua senha.
            </p>
          </div>
          <form onSubmit={handleEmailSubmit}>
            <div className="input-reset">
              {" "}
              {/* Inputs - colocando novo css pela posição do objeto */}
              <input
                type="email"
                className="reset"
                placeholder="Insira seu email"
                value={emailValue}
                onChange={(event) => setEmailValue(event.target.value)}
                required
              />
            </div>

            <div className="button-password">
              <button type="submit" style={{ cursor: "pointer" }}>
                Enviar Instruções
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="login-mobile">
        <div className="redefinacao-logo">
          <img src={Logo} alt="" />
        </div>

        <div className="info-login-mobile">
          <h1>Verificação de e-mail</h1>

          <p>
            Enviamos um código de verificação para o seu e-mail. Por favor,
            insira o código abaixo para confirmar sua identidade.
          </p>
        </div>

        <div className="top">
          <div className="reset-img">
            <img id="formaBottom" src={FormaBottom} alt="" />
          </div>

          <div className="login-redefinicao">
            
            <form onSubmit={handleEmailSubmit}>
              <div className="input-reset">
                {" "}
                {/* Inputs - colocando novo css pela posição do objeto */}
                <input
                  type="email"
                  className="reset"
                  placeholder="Insira seu email"
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                  required
                />
              </div>
            </form>

            <div className="button-password">
              <button type="submit" style={{ cursor: "pointer" }}>
                Enviar
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
