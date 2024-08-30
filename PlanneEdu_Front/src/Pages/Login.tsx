import BackgroundLogin from "../assets/background-login.svg"
import Computer from "../assets/computer.svg"
import Logo from "../assets/logo.svg"

import "../Css/Login.css"

export function Login() {
    return (
        /* separando as imagens do texto */
        <section className="login">

            <div className="images">
                <div className="container">
                    <img className="back" src={BackgroundLogin} alt="" />
                    <img className="computer" src={Computer} alt="" />
                </div>
            </div>

            <div className="right-side">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>

                <div className="text">
                    <div className="forms">
                        <h2>Sua ferramenta para <br />
                            um ensino mais eficiente</h2>
                        <p>Faça login para continuar</p>
                    </div>

                    <div className="inputs">
                        <input className="input" type="number" placeholder="Insira seu NIF"  />
                        <input className="input" type="password" placeholder="Insira sua senha" />
                    </div>

                    <div className="password">
                        <p> Esqueceu sua senha? clique aqui.</p>
                    </div>

                    <div className="button">
                        <button>Entrar</button>
                    </div>
                </div>

            </div>

        </section>



    )
}