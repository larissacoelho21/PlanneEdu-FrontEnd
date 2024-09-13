/* Images */
import { KeyRound, Mail, Phone } from "lucide-react";
import Background from "../../assets/backgroundProfile.svg"

import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";

export function ProfileTeacher() {
    return (
        <section className="profileTeacher">
            <div className="navbar">
                <NavBarProfessor />
            </div>

            <div className="intro">
                <h1>Perfil</h1>
                <hr />
            </div>

            <div className="cardProfile">
                <div className="container-profile">
                    <div className="img">
                        <img src={Background} alt="" />
                    </div>
                </div>

                <div className="info-profile">
                    <h3 className="name">
                        Eduardo Ferreira Dias
                    </h3>

                    <div className="nif">
                        <KeyRound />
                        <p>15639479</p>
                    </div>

                    <div className="emailPersonal">
                        <Mail />
                        <p>eduardo.fdias@gmail.com</p>
                    </div>

                    <div className="phone">
                        <Phone />
                        <p>11 9785-5975</p>
                    </div>
                </div>

                <div className="courses-profile">
                    <h3>Cursos atribuídos</h3>
                    <p>Logística</p>
                    <p>Administração</p>
                </div>

                <div className="classes-profile">
                    <h3>Turmas atribuídas</h3>
                    <p>Manhã 2024</p>
                    <p>Tarde 2024</p>
                    <p>Tarde 2023</p>
                </div>
            </div>
        </section>
    )
}