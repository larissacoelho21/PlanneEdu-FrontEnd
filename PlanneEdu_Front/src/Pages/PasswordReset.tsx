import { useState } from "react";
import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword";

import "../Css/PasswordReset.css";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../Config/config";
import { toast } from "sonner";

/* Redefinição de senha */
export function PasswordReset() {
  const [emailValue, setemailValue] = useState("");

  const navigate = useNavigate();

  const postEmail = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("E-mail enviado:", emailValue);

    fetch(`${BaseUrl}/auth/forgot_password`, {
      //conectando com o computador que está rodando o back-end
      method: "POST", //method post de envio
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        //transformando os valores de nif e senha em string
        email: emailValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || "Erro ao enviar o e-mail");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("email enviado:", data);
        // Armazena o e-mail no localStorage
        localStorage.setItem("emailValue", emailValue);
        toast.success("E-mail enviado, verifique sua caixa de mensagens!");
        navigate("/verificacaoemail");
      })
      .catch((error) => {
        toast.error("Não foi possível enviar o email, tente novamente"); //alert
        console.error("Erro ao enviar email: ", error);
      });
  };

  return (
    <section className="PasswordReset">
      <div className="background">
        <BackgroundPassword /> {/* Componente do fundo forma + saída + logo */}
      </div>

      <div className="Reset-Info">
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
          <form onSubmit={postEmail}>
            <div className="input-reset">
              {" "}
              {/* Inputs - colocando novo css pela posição do objeto */}
              <input
                type="email"
                className="reset"
                placeholder="Insira seu email"
                value={emailValue}
                onChange={(event) => setemailValue(event.target.value)}
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
    </section>
  );
}
