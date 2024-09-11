/* Images */
import LogoName from "../../assets/logoname.svg"
import Notifications from "../../assets/notifications.svg"
import Profile from "../../assets/profile.svg"
import DarkMode from "../../assets/darkmode.svg"

/* Icons */
import { Settings } from 'lucide-react';
import { CodeXml } from 'lucide-react';
import { GalleryVerticalEnd } from 'lucide-react';
import { Folder } from 'lucide-react';
import { ChartLine } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

/* funções react */
import { Link } from "react-router-dom";
import { ReactNode, useEffect, useRef, useState } from "react"

/* css */
import "../NavBar-Professores/navBarProfessor.css"

interface DropdownItemProps {
    icon: ReactNode;
    text: string;
}

function DropdownItem(props: DropdownItemProps) {
    return (
        <li className='dropdownItem'>
            <i>{props.icon}</i>
            <Link to="#"> {props.text} </Link>
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
                                <div className="menu-trigger">
                                    <Link to="/homeprofessor">Ínicio</Link>
                                </div>

                                <li className="nav-dropdown">
                                    <div className="li-inicio" onClick={() => { setOpen(!open) }}>
                                        <Link to="#">Planos de ensino <ChevronDown /></Link>
                                    </div>

                                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                                        <DropdownItem icon={<CodeXml />} text={"Desenvolvimento de sistemas"} />
                                        <DropdownItem icon={<Settings />} text={"Eletromecânica"} />
                                        <DropdownItem icon={<ChartLine />} text={"Logística"} />
                                        <DropdownItem icon={<Folder />} text={"Administração"} />
                                        <DropdownItem icon={<GalleryVerticalEnd />} text={"Geral"} />
                                    </div>
                                </li>

                                <li><Link to="/">Planos de curso</Link></li>

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