/* Images */
import LogoName from "../../assets/logoname.svg"

/* import Notifications from "../../assets/notifications.svg"
import Profile from "../../assets/profile.svg"
import DarkMode from "../../assets/darkmode.svg" */

/* Imagens que não foram utilizadas, icones do dropdown */
/*  import DsIcon from "../../assets/dsIcon.svg"
import Eletromecanica from "../../assets/eletroIcon.svg"
import Logistica from "../../assets/logIcon.svg"
import AdmIcon from "../../assets/folderIcon.svg"
import Geral from "../../assets/geralIcon.svg" */

/* Icons do dropdown */
import { CodeXml, Settings, GalleryVerticalEnd, Folder, ChartLine, ChevronDown } from 'lucide-react';

/* funções react */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from "react-router-dom";
import { ReactNode, useEffect, useRef, useState } from "react"

/* css */
import "../NavBar-Professores/navBarProfessor.css"
import { faBell, faMoon, faUser } from "@fortawesome/free-solid-svg-icons";


/* Criando interface para declarar as props do DropdownItem */
interface DropdownItemProps {
    icon: ReactNode; /* React Node utilizado para aceitar icone(svg) ou string */
    text: string; /* nome do link */
    to: string; /* path para as páginas */
}

/* props ciradas na Interface */
function DropdownItem({ icon, text, to }: DropdownItemProps) {
    return (
        <NavLink to={to} className='dropdownItem'> {/* usado para navegar as páginas de forma renderizada */}
            <i className="icon">{icon}</i> {/* imagem */}
            <Link className="menu-a" to="#"> {text} </Link> {/* Link */}
        </NavLink>
    );
}

interface DropdownNotificationProps {
    text: string;
    secondtext: string;
    to: string;
}

function DropdownNotification({ text, secondtext, to }: DropdownNotificationProps) {
    return (
        <NavLink to={to} className='dropdownNotification'>
            <p className="paragrafo">
                {text}
            </p>
            <p className="sub-paragrafo">
                {secondtext}
            </p>
        </NavLink>
    )
}

export function NavBarProfessor() {

    /* Criando função para identificarquando o dropdown esta ativo */
    const [openOne, setOpenOne] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);

    let menuRef = useRef<HTMLDivElement>(null);
    let notRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenOne(false);
            }
            if (notRef.current && !notRef.current.contains(e.target as Node)) {
                setOpenTwo(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section className="navbar-prof">
            <nav>
                <div className="navbarOne">
                    <div className="right-side">
                        <div className="nav-logo"> {/* logo projeto */}
                            <Link to="/homeprofessor"><img src={LogoName} alt="" /></Link>
                        </div>
                    </div>

                    <div className="left-side">

                        <div className="nav-list" ref={menuRef}>
                            <ul className="navbar-nav" >

                                <NavLink /* identificando se o caminho da página selecionada corresponde */
                                    className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
                                    to="/homeprofessor"> Início
                                </NavLink>

                                {/* < li >
                                        <Link className="navbar-link" to="/homeprofessor">Ínicio</Link>
                                    </li> */}

                                <li className="nav-dropdown">
                                    <div className="li-inicio" onClick={() => { setOpenOne(!openOne) }}>
                                        <div className={`navbar-link ${openOne ? 'selected' : ''}`} > {/* Identificando quando estiver clicado (selecionado) aparecer diferente */}
                                            Planos de ensino <ChevronDown />
                                        </div>
                                    </div>

                                    <li>
                                        <div className={`dropdown-menu ${openOne ? 'active' : 'inactive'}`}> {/* menu */}
                                            <DropdownItem to="/" icon={<CodeXml size={20} />} text={"Desen. de sistemas"} />
                                            <DropdownItem to="/" icon={<Settings size={20} />} text={"Eletromecânica"} />
                                            <DropdownItem to="/" icon={<ChartLine size={20} />} text={"Logística"} />
                                            <DropdownItem to="/" icon={<Folder size={20} />} text={"Administração"} />
                                            <DropdownItem to="/" icon={<GalleryVerticalEnd size={20} />} text={"Geral"} />
                                        </div>
                                    </li>

                                </li>

                                <NavLink
                                    className={({ isActive }) => (isActive ? 'navbar-link active last' : 'navbar-link')}
                                    to="/"
                                >
                                    Planos de curso
                                </NavLink>
                                {/* <li><Link className="navbar-link" to="/">Planos de curso</Link></li> */}

                            </ul>

                        </div>

                        <div className="Icons">
                            <div className="icon-list" ref={notRef}>
                                <ul>
                                    <li className="notification-dropdown">
                                        <div className="li-bell" onClick={() => { setOpenTwo(!openTwo) }}>
                                            <div className="link-bell">
                                                <FontAwesomeIcon icon={faBell} className="iconsBell" />
                                            </div>
                                        </div>

                                        <li>
                                            <div className={`dropdown-notification ${openTwo ? 'ativo' : 'inactive'}`}>
                                                <DropdownNotification to="#" text={"O professor Giovani respondeu ao seu comentário."} secondtext={"Toque aqui para visualizar."} />
                                            </div>
                                            
                                        </li>

                                    </li>

                                    <li className="li-notification">
                                        <div className="secondPart">
                                            <div className="profile">
                                                <NavLink to="#" className="profileIcon">
                                                    <FontAwesomeIcon icon={faUser} className="not-icons" />
                                                </NavLink>
                                            </div>
                                            <div className="darkmode">
                                                <NavLink to="#" className="darkmodeIcon">
                                                    <FontAwesomeIcon icon={faMoon} className="not-icons" />
                                                </NavLink>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                        </div>
                    </div>


                </div>

            </nav>
        </section >
    )
}