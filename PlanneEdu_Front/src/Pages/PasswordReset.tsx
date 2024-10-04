import { useState } from "react";
import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword";

import "../Css/PasswordReset.css";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../Config/config";
import { toast } from "sonner";

/* Redefinição de senha */
export function PasswordReset() {
  const [emailValue, setemailValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const postEmail = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true); // Inicia o estado de carregamento

    console.log("E-mail enviado:", emailValue);

    console.log(isLoading);

    /* const toastId = toast.loading("Enviando e-mail..."); */
    const promise = () =>
      new Promise((resolve) => setTimeout(() => resolve, 1000));

    const toastId = toast.promise(promise, {
      loading: "Aguarde, estamos enviando seu e-mail...",
    });

    fetch(`${BaseUrl}/auth/forgot_password`, {
      //conectando com o computador que está rodando o back-end
      method: "POST", //method post de envio
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //transformando os valores de email em string
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

        toast.dismiss(toastId);
        toast.success(
          "E-mail enviado com sucesso! Verifique sua caixa de entrada."
        );
        setIsLoading(false); // Finaliza o estado de carregamento
        navigate("/verificacaoemail"); // Navega para a próxima página
      })
      .catch((error) => {
        setIsLoading(false); // Finaliza o estado de carregamento em caso de erro
        toast.dismiss(toastId); // Remove o toast de carregamento
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
