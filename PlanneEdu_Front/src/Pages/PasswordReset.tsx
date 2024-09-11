import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword"

import "../Css/PasswordReset.css"

/* Redefinição de senha */
export function PasswordReset() {
    return(
        <section className="PasswordReset">
            <div className="background">
                <BackgroundPassword /> {/* Componente do fundo forma + saída + logo */}
            </div>

            <div className="Reset-Info"> {/* Div maior - não possue css */}
                <div className="title-text">
                    <div className="title"> {/* Títulos */}
                        <h2>Redefinição de senha</h2>
                        <p>Informe seu e-mail abaixo, e enviaremos as instruções <br />
                            necessárias para que você possa redefinir sua senha.</p>
                    </div>

                    <div className="input-reset"> {/* Inputs - colocando novo css pela posição do objeto */}
                        <input type="email" className="reset" placeholder="Insira seu email" required/>
                    </div>

                    <div className="button-password"> 
                        <button type="submit" style={{cursor: "pointer"}}>Enviar Instruções</button>
                    </div>
                </div>

            </div>
        </section>
    )
}