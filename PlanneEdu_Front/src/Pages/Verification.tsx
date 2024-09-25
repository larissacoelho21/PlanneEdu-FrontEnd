import { Link, useNavigate } from "react-router-dom";
import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword";

/* Página de verificação de email, solicitação do código */
import "../Css/Verification.css";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BaseUrl } from "../Config/config";
import { toast } from "sonner";

export function VerificationEmail() {
  /* Funçao para aparecer a senha */
  const [isShow, setisShow] = useState(false);

  const handlePassword = () => setisShow(!isShow);

  const navigate = useNavigate();

  /* Função Back-End */

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estado para armazenar o e-mail recuperado
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailValue");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Erro: e-mail não encontrado. Por favor, recomece o processo.");
      navigate("/redefinicaoemail"); // Redireciona para o início caso o e-mail não seja encontrado
    }
  }, [navigate]);

  const Verification = (event: React.FormEvent) => {
    event.preventDefault();

    fetch(`${BaseUrl}/auth/reset_password`, {
      //conectando com o computador que está rodando o back-end
      method: "POST", //method post de envio
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //transformando os valores de nif e senha em string
        email: email, // Certifique-se de passar o e-mail do usuário
        code: code,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Erro");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("sucesso", data);
        toast.success("Nova senha criado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Erro ao redefinir a senha: ${error.message}`) //alert
        console.error(error.message);
      });
  };

  return (
    <section className="VerificationEmail">
      <div className="background">
        <BackgroundPassword /> {/* Componente fundo */}
      </div>

      <form onSubmit={Verification}>
        {/* Mesmo nome de divs da pag "PasswordReset" já que possue a mesma configuração */}
        <div className="Reset-Info">
          <div className="title-text">
            <div className="title-verification">
              <h2>Verificação de E-mail</h2>
              <p>
                Enviamos um código de verificação para o seu e-mail. Por favor,{" "}
                <br /> insira o código abaixo para confirmar sua identidade.
              </p>
            </div>

            <div className="input-verification">
              {" "}
              {/* Input para a verificação do código */}
              {/* verificação de quantidade de caracteres */}
              <input
                type="number"
                className="verification"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </div>

            <div className="confirm">
              <p className="confirmEmail">
                Não recebeu o Email?
                <span>
                  <Link className="link-return" to="/redefinicaosenha">
                    {" "}
                    Reenviar Código
                  </Link>
                </span>
              </p>
            </div>

            <div className="input-reset">
              <label className="inputReset">
                <input
                  className="input-password"
                  type={isShow ? "text" : "password"}
                  placeholder="Insira sua nova senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button onClick={handlePassword} type="button">
                  {isShow && <Eye size={18} />}
                  {!isShow && <EyeOff size={18} />}
                </button>
              </label>
              <label className="inputReset">
                <input
                  className="input-password"
                  type={isShow ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
                <button onClick={handlePassword} type="button">
                  {isShow && <Eye size={18} />}
                  {!isShow && <EyeOff size={18} />}
                </button>
              </label>
            </div>

            <div className="button-verification">
              <button type="submit" style={{ cursor: "pointer" }}>
                Trocar senha
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
