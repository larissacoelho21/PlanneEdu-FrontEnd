import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import "../../Css/Opp/HomeOpp.css";
import { Link } from "react-router-dom";


export function HomeOpp() {
    return (
        <section className="homeTeacher">
            <NavBarProfessor />
            <div className="introTeacher">
                <h1>Seja bem-vindo, Odair!</h1>
                <h2>Visualize os planos de ensino disponíveis</h2>
                <hr />
            </div>

            <div className="table-container">
                <table className="table-homeopp">
                    <thead>
                        <tr>
                            <th id="title-homeopp" colSpan={4}>Desenvolvimento de sistemas</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th id="subtitle">Arthur</th>
                            <th id="subtitle">Giovani</th>
                            <th id="subtitle">Samuel</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="turmas-homeopp">Dev. SESI 2023</td>
                            <td className="td">
                                <Link to="" className="button">Prog. Back</Link>
                            </td>
                            <td className="td">
                                <Link to="" className="button">Projetos</Link>
                                <Link to="" className="button">Requisitos</Link>
                            </td>
                            <td className="td">
                                <Link to="" className="button">Projetos</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="turmas-homeopp">Dev. Noite 2023</td>
                            <td className="td"></td>
                            <td className="td"></td>
                            <td className="td"></td>
                        </tr>
                        <tr>
                            <td className="turmas-homeopp">Libbs</td>
                            <td className="td"></td>
                            <td className="td"></td>
                            <td className="td"></td>
                        </tr>
                        <tr>
                            <td className="turmas-homeopp">DS SESI 2024</td>
                            <td className="td"></td>
                            <td className="td"></td>
                            <td className="td"></td>
                        </tr>
                        <tr>
                            <td className="turmas-homeopp1">DS Noite 2024</td>
                            <td className="td1"></td>
                            <td className="td1"></td>
                            <td className="td2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    )
}