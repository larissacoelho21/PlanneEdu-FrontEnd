import Image1 from "../../assets/background-password.svg"
import Return from "../../assets/back.svg"
import Logo from "../../assets/logo.svg"

import "../BackgroundPassword/BackgoundPassword.css"
import { Link } from "react-router-dom"

export function BackgroundPassword() {
    return (
        <section className="background">
            <div className="background">
                <div className="container">
                    <img className="backOne" src={Image1} alt="" />
                </div>

                <div className="return">
                    <Link to="/"><img className="returnPage" src={Return} alt="retornar" /></Link>
                </div>
            </div>

            <div className="logo-password">
                <img src={Logo} alt="retornar" />
            </div>

        </section>
    )
}