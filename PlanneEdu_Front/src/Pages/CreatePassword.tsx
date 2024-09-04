import { BackgroundPassword } from "../Components/BackgroundPassword/BackgroundPassword"

import "../Css/CreatePassword.css"

/* Página para a definição da nova senha */
export function CreatePassword() {
    return(
        <section className="new-password">
            <div className="background">
                <BackgroundPassword /> {/* Cmponente fundo */}
            </div>

            {/* Mesmo nome de divs da pag "PasswordReset" já que possue a mesma configuração */}
            <div className="Reset-Info">
                <div className="title-text">
                    <div className="title">
                        <h2>Criar nova senha</h2>
                        <p>Sua nova senha deve ser diferente da sua senha anterior.</p>
                    </div>

                    <div className="input-reset">
                        <input type="password" className="reset" placeholder="Insira sua nova senha" required/>
                        <input type="password" className="reset" placeholder="Confirme sua senha" required/>
                    </div>

                    <div className="button">
                        <button type="submit">Salvar</button>
                    </div>
                </div>

            </div>
        </section>
    )
}