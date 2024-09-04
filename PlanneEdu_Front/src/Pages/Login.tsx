import { Link } from "react-router-dom"
import BackgroundLogin from "../assets/background-login.svg"
import Computer from "../assets/computer.svg"
import Logo from "../assets/logo.svg"

import "../Css/Login.css"

/* Página de Login */
export function Login() {
    return (
        <section className="login">

            {/* Background - forma + ilustração */}
            <div className="images">
                <div className="container">
                    <img className="back" src={BackgroundLogin} alt="" /> {/* Forma */}
                    <img className="computer" src={Computer} alt="" /> {/* Ilustração */}
                </div>
            </div>

            <div className="right-side"> {/* Definindo a segunda parte da tela */}
                <div className="logo"> {/* Logo do projeto */}
                    <img src={Logo} alt="" />
                </div>

                <div className="text">
                    <div className="forms"> {/* Títulos */}
                        <h2>Sua ferramenta para <br />
                            um ensino mais eficiente</h2>
                        <p>Faça login para continuar</p>
                    </div>

                    <div className="inputs"> {/* Input */}
                        <input className="input" type="number" placeholder="Insira seu NIF"  required />
                        <input className="input" type="password" placeholder="Insira sua senha" required />
                    </div>

                    <div className="password"> {/* Link caso esqueça senha */}
                        <Link to="/redefinicaosenha" >Esqueceu sua senha? Clique aqui.</Link>
                    </div>

                    <div className="button">
                        <button type="submit">Entrar</button>
                    </div>
                </div>

            </div>

        </section>



    )
}