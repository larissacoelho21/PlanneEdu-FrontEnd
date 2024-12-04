import "../Css/ErrorPage.css";
import landingLogo from '../assets/logo.svg';

export function ErrorPage() {
    return (
        <section className="error-page">
            <div className="erro">
                <img src={landingLogo} alt="" />
                <div className="descricao-erro">
                    <h1>404</h1>
                    <p>Infelizmente não conseguimos encontrar
                        a página que você tentou acessar : (</p>

                    <div className="buttons-error">
                        <a href="/"><button>VOLTAR AO INÍCIO</button></a>
                    </div>
                </div>
            </div>
        </section>
    )
}