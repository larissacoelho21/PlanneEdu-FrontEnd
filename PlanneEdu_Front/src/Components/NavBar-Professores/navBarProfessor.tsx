/* Images */
import LogoName from "../../assets/logoname.svg"
import Notifications from "../../assets/notifications.svg"
import Profile from "../../assets/profile.svg"
import DarkMode from "../../assets/darkmode.svg"
/*  import DsIcon from "../../assets/dsIcon.svg"
import Eletromecanica from "../../assets/eletroIcon.svg"
import Logistica from "../../assets/logIcon.svg"
import AdmIcon from "../../assets/folderIcon.svg"
import Geral from "../../assets/geralIcon.svg" */

/* Icons */
import { CodeXml } from 'lucide-react';
import { Settings } from 'lucide-react';
import { GalleryVerticalEnd } from 'lucide-react';
import { Folder } from 'lucide-react';
import { ChartLine } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

/* funções react */
import { Link, NavLink } from "react-router-dom";
import { /* ReactNode */ ReactNode, useEffect, useRef, useState } from "react"

/* css */
import "../NavBar-Professores/navBarProfessor.css"

interface DropdownItemProps {
    icon: ReactNode;
    text: string;
    to: string; /* Link  */
}

function DropdownItem({ icon, text, to }: DropdownItemProps) {
    return (
        <NavLink to={to} className='dropdownItem'>
            <i className="icon">{icon}</i>
            <Link className="menu-a" to="#"> {text} </Link>
        </NavLink>
    );
}

export function NavBarProfessor() {

    const [open, setOpen] = useState(false);

    let menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <section className="navbar-prof">
            <nav>
                <div className="navbarOne">
                    <div className="right-side">
                        <div className="nav-logo">
                            <Link to="/homeprofessor"><img src={LogoName} alt="" /></Link>
                        </div>
                    </div>

                    <div className="left-side">

                        <div className="nav-list" ref={menuRef}>
                            <ul className="navbar-nav" >

                                <NavLink
                                    className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
                                    to="#"> Início 
                                </NavLink>

                                    {/* < li >
                                        <Link className="navbar-link" to="/homeprofessor">Ínicio</Link>
                                    </li> */}

                                <li className="nav-dropdown">
                                    <div className="li-inicio" onClick={() => { setOpen(!open) }}>
                                        <div className={`navbar-link ${open ? 'selected' : ''}`} >
                                            Planos de ensino <ChevronDown />
                                        </div>
                                    </div>

                                    <li>
                                        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                                            <DropdownItem to="/" icon={<CodeXml size={20} />} text={"Desen. de sistemas"}  />
                                            <DropdownItem to="/" icon={<Settings size={20} />} text={"Eletromecânica"} />
                                            <DropdownItem to="/" icon={<ChartLine size={20} />} text={"Logística"} />
                                            <DropdownItem to="/" icon={<Folder size={20}/>} text={"Administração"} />
                                            <DropdownItem to="/" icon={<GalleryVerticalEnd size={20}/>} text={"Geral"} />
                                        </div>
                                    </li>

                                </li>

                                <NavLink
                                    className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
                                    to="/"
                                >
                                    Planos de curso 
                                </NavLink>
                                {/* <li><Link className="navbar-link" to="/">Planos de curso</Link></li> */}

                            </ul>

                        </div>

                        <div className="profile">
                            <div className="notifications">
                                <img src={Notifications} alt="" />
                            </div>
                            <div className="perfil">
                                <img src={Profile} alt="" />
                            </div>
                            <div className="darkMode">
                                <img src={DarkMode} alt="" />
                            </div>
                        </div>
                    </div>


                </div>

            </nav>
        </section >
    )
}