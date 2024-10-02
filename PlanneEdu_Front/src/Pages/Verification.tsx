import { Link } from "react-router-dom";
import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword";

/* Página de verificação de email, solicitação do código */
import "../Css/Verification.css"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export function VerificationEmail() {

    const [isShow, setisShow] = useState(false);

    const handlePassword = () => setisShow(!isShow)

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

                    <div className="input-reset">
                    <label className="inputReset">
                            <input 
                            className="input-password"
                                type={isShow ? "text" : "password"} 
                                placeholder="Insira sua nova senha" 
                                required 
                            />
                            <button onClick={handlePassword} type="button">
                                {isShow && <Eye size={18} />}   
                                {!isShow  && <EyeOff size={18} />}
                            </button>
                        </label>
                        <label className="inputReset">
                            <input 
                            className="input-password"
                                type={isShow ? "text" : "password"} 
                                placeholder="Confirme sua senha" 
                                required 
                            />
                            <button onClick={handlePassword} type="button">
                                {isShow && <Eye size={18} />}   
                                {!isShow  && <EyeOff size={18} />}
                            </button>
                        </label>
                    </div>

                    <div className="button-verification">
                        <button type="submit" style={{cursor: "pointer"}}>Trocar senha</button>
                    </div>
                </div>
            </div>
        </section>
    )
}