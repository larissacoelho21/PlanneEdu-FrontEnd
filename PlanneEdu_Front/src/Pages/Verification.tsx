import { Link } from "react-router-dom";
import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword";

/* Página de verificação de email, solicitação do código */
import "../Css/Verification.css"
export function VerificationEmail() {
    return (
        <section className="VerificationEmail">
            <div className="background">
                <BackgroundPassword /> {/* Componente fundo */}
            </div>

            {/* Mesmo nome de divs da pag "PasswordReset" já que possue a mesma configuração */}
            <div className="Reset-Info">
                <div className="title-text">
                    <div className="title">
                        <h2>Verificação de E-mail</h2>
                        <p>Enviamos um código de verificação para o seu e-mail. <br />
                            Por favor, insira o código abaixo para confirmar sua <br />
                            identidade.</p>
                    </div>

                    <div className="input-verification"> {/* Input para a verificação do código */}
                        {/* verificação de quantidade de caracteres */}
                        <input type="number"
                            className="verification"
                            required />
                    </div>

                    <div className="confirm">
                        <p className="time">00:58</p> {/* Cronometro */}
                        <p className="confirmEmail">Não recebeu o Email?</p> {/* Verificação: só poderá acessar o link quando o cronometro finalizar */}
                        <Link className="link-return" to="/redefinicaosenha"> Reenviar Código</Link>
                    </div>

                    <div className="button-verification">
                        <button>Verificar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}