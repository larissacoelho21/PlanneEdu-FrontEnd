import { Link, useNavigate } from "react-router-dom";
import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword";
import FormaBottom from "../assets/forma_certa.svg";
import Logo from "../assets/logo.svg";

/* Página de verificação de email, solicitação do código */
import "../Css/Verification.css";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { verificacao } from "../Services/Axios";

export function VerificationEmail() {
  /* Funçao para aparecer a senha */
  const [isShow, setisShow] = useState(false);
  const [isShow2, setisShow2] = useState(false);

  const handlePassword = () => setisShow(!isShow);
  const handlePassword2 = () => setisShow2(!isShow2);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailValue");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error(
        "Erro: e-mail não encontrado. Por favor, recomece o processo."
      );
      navigate("/redefinicaoemail");
    }
  }, [navigate]);

  const backVerfication = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await verificacao(email, code, password, confirmPassword);
    } catch (error) {
      // Você pode lidar com algo extra aqui, mas não é necessário
      console.error(error);
    }
  }

  return (
    <section className="VerificationEmail">
      <div className="background">
        <BackgroundPassword /> {/* Componente fundo */}
      </div>

      <form onSubmit={backVerfication}>
        {/* Mesmo nome de divs da pag "PasswordReset" já que possue a mesma configuração */}
        <div className="reset-info">
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
              <input //TODO: Adicionar max de caracteres
                type="number"
                className="verification"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </div>

            <div className="confirm">
              <p className="confirm-email">
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
              <label className="label-reset">
                <input
                  className="input-password"
                  type={isShow ? "text" : "password"}
                  placeholder="Insira sua nova senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  onClick={handlePassword}
                  type="button" //TODO: Icone acionando junto com o input de confirme senha
                >
                  {isShow && <Eye size={18} />}
                  {!isShow && <EyeOff size={18} />}
                </button>
              </label>
              <label className="label-reset">
                <input //TODO: Adicionar max de caracteres
                  className="input-password"
                  type={isShow2 ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
                <button
                  onClick={handlePassword2}
                  type="button" //TODO: Icone acionando junto com o input de informe senha
                >
                  {isShow2 && <Eye size={18} />}
                  {!isShow2 && <EyeOff size={18} />}
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

      <div className="login-mobile">
        <div className="veri-logo">
          <img src={Logo} alt="" />
        </div>

        <div className="info-login-mobile">
          <h1>Criar nova senha</h1>

          <p>Sua nova senha deve ser diferente da sua senha anterior.</p>
        </div>

        <div className="top">
          <div className="verification-img">
            <img id="formaBottom" src={FormaBottom} alt="" />
          </div>

          <div className="input-vali">
            <label className="label-vali">
              <input
                className="input-password1"
                type={isShow ? "text" : "password"}
                placeholder="Insira sua nova senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button onClick={handlePassword} type="button">
                {isShow && <Eye size={22} color="white" />}
                {!isShow && <EyeOff size={22} color="white" />}
              </button>
            </label>
            <label className="label-vali">
              <input
                className="input-password1"
                type={isShow ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <button onClick={handlePassword} type="button">
                {isShow && <Eye size={22} color="white" />}
                {!isShow && <EyeOff size={22} color="white" />}
              </button>
            </label>
          </div>

          <div className="button-verification">
            <button type="submit" style={{ cursor: "pointer" }}>
              Criar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
