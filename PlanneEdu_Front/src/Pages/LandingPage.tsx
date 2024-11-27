import "../Css/LandingPage.css";
import landingLogo from '../assets/logo.svg';

export function LandingPage() {
    return (
        <section className="landing-page">
            <div className="first-section">
                <div className="bemVindo">
                    <img src={landingLogo} alt="" />
                    <h2>Seja bem-vindo(a) ao</h2>
                    <h1>PlanneEdu.</h1>
                    <p>Seu aliado na construção de estratégias de ensino inovadoras!</p>
                    <div className="buttons-conheca">
                        <a href="/addUser"><button>Conheça nosso projeto</button></a>
                    </div>
                </div>
            </div>

            <div className="second-section">
                <h1><span className="conheca">Conheça e entenda</span> nosso projeto!</h1>
                <p>O sistema que vaio para te ajudar.</p>
            </div>
        </section>
    )
}