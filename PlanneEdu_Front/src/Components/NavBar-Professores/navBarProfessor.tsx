/* Images */
import LogoName from "../../assets/logoname.svg"
import Notifications from "../../assets/notifications.svg"
import Profile from "../../assets/profile.svg"
import DarkMode from "../../assets/darkmode.svg"
import DsIcon from "../../assets/dsIcon.svg"
import Eletromecanica from "../../assets/eletroIcon.svg"
import Logistica from "../../assets/logIcon.svg"
import AdmIcon from "../../assets/folderIcon.svg"
import Geral from "../../assets/geralIcon.svg"


/* Icons */
/* import { Settings } from 'lucide-react';
import { CodeXml } from 'lucide-react';
import { GalleryVerticalEnd } from 'lucide-react';
import { Folder } from 'lucide-react';
import { ChartLine } from 'lucide-react'; */
import { AlignCenter, ChevronDown } from 'lucide-react';

/* funções react */
import { Link } from "react-router-dom";
import { /* ReactNode */ useEffect, useRef, useState } from "react"

/* css */
import "../NavBar-Professores/navBarProfessor.css"

interface DropdownItemProps {
    img: string;
    text: string;
}

function DropdownItem(props: DropdownItemProps) {
    return (
        <li className='dropdownItem'>
            <img src={props.img} alt="" />
            <Link className="menu-a" to="#"> {props.text} </Link>
        </li>
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
                            <ul className="navbar-nav">

                                <li>
                                    <Link className="navbar-link" to="/homeprofessor">Ínicio</Link>
                                </li>


                                <li className="nav-dropdown">
                                    <div className="li-inicio" onClick={() => { setOpen(!open) }}>
                                        <Link className="navbar-link" to="#">Planos de ensino <ChevronDown /></Link>
                                    </div>

                                    <li>
                                        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                                            <DropdownItem img={DsIcon} text={"Desen. de sistemas"} />
                                            <DropdownItem img={Eletromecanica} text={"Eletromecânica"} />
                                            <DropdownItem img={Logistica} text={"Logística"} />
                                            <DropdownItem img={AdmIcon} text={"Administração"} />
                                            <DropdownItem img={Geral} text={"Geral"} />
                                        </div>
                                    </li>

                                </li>

                                <li><Link className="navbar-link" to="/">Planos de curso</Link></li>

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
        </section>
    )
}