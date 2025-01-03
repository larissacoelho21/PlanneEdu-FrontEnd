/* Images */
import LogoName from "../../../assets/logoname.svg";
import LogoMobile from "../../../assets/logoMobile.svg";

/* Icons do dropdown */
import {
  CodeXml,
  Settings,
  GalleryVerticalEnd,
  Folder,
  ChartLine,
  ChevronDown,
  LogOut,
  UserPen,
  Menu,
  X,
} from "lucide-react";

/* funções react */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useRef, useState } from "react";

/* css */
import "../NavBar-Professores/navBarProfessor.css";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";

/* Dropdown Planos ensinos */
/* Criando interface para declarar as props do DropdownItem */
interface DropdownItemProps {
  icon: ReactNode /* React Node utilizado para aceitar icone(svg) ou string */;
  text: string /* nome do link */;
  to: string /* path para as páginas */;
}

/* props criadas na Interface */
function DropdownItem({ icon, text, to }: DropdownItemProps) {
  return (
    <NavLink to={to} className="dropdownItem">
      <i className="icon">{icon}</i> {/* imagem */}
      <span className="menu-text">{text}</span> {/* texto */}
    </NavLink>
  );
}

/* Dropdown notificação */

interface DropdownNotificationProps {
  text: string;
  secondtext: string;
  to: string;
}

function DropdownNotification({
  text,
  secondtext,
  to,
}: DropdownNotificationProps) {
  return (
    <div className="dropdownNotification">
      <p className="paragrafo">{text}</p>
      <NavLink to={to} className="sub-paragrafo-link">
        <p className="sub-paragrafo">{secondtext}</p>
      </NavLink>
    </div>
  );
}

/* Dropdown Perfil */
interface DropdownProfileProps {
  icon: ReactNode /* React Node utilizado para aceitar icone(svg) ou string */;
  text: string;
  to: string;
  onClick?: () => void; // Adicione o onClick como prop opcional
}

function DropdownProfile({ icon, text, to, onClick }: DropdownProfileProps) {
  return (
    <NavLink to={to} className="dropdownProfile" onClick={onClick}>
      <i className="icon">{icon}</i> {/* imagem */}
      <span className="menu-text">{text}</span> {/* texto */}
    </NavLink>
  );
}

export function NavBarProfessor() {
  /* Criando função para identificarquando o dropdown esta ativo */
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [opentThree, setOpenThree] = useState(false);

  /* Mobile */
  const [MenuOpen, setMenuOpen] = useState(false);
  const [ProfileDropdownOpen, SetProfileDropdownOpen] = useState(false);
  const [DropdownMobileOpen, SetIsDropdownMobileOpen] = useState(false);
  const toggleDropdwonMobile = () => {
    SetIsDropdownMobileOpen(!DropdownMobileOpen);
  };

  const toggleDropdwonMobileProfile = () => {
    SetProfileDropdownOpen(!ProfileDropdownOpen);
  };

  /* Fim mobile */

  let menuRef = useRef<HTMLDivElement>(null);
  let notRef = useRef<HTMLDivElement>(null);
  let notRefP = useRef<HTMLDivElement>(null);
  let menuOpenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenOne(false);
      }
      if (notRef.current && !notRef.current.contains(e.target as Node)) {
        setOpenTwo(false);
      }
      if (notRefP.current && !notRefP.current.contains(e.target as Node)) {
        setOpenThree(false);
      }
      if (
        menuOpenRef.current &&
        !menuOpenRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false); // Fecha o menu ao clicar fora dele
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear(); //para limpar tudo

    // Redireciona o usuário para a página de login
    navigate("/");
  };

  return (
    <section className="navbar-prof">
      <nav>
        <div className="navbarOne">
          <div className="right-side">
            <div className="nav-logo">
              {" "}
              {/* logo projeto */}
              <Link to="/homeprofessor">
                <img src={LogoName} alt="" />
              </Link>
            </div>

            <div className="logoMobile">
              {" "}
              {/* logo versão mobile */}
              <Link to="/homeprofessor">
                <img src={LogoMobile} alt="" />
              </Link>
            </div>
          </div>

          <div className="left-side">
            <div className="nav-list" ref={menuRef}>
              <ul className="navbar-nav">
                <NavLink /* identificando se o caminho da página selecionada corresponde */
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                  to="/homeprofessor"
                >
                  <p>Início</p>
                </NavLink>

                <li className="nav-dropdown">
                  <div
                    className="li-inicio"
                    onClick={() => {
                      setOpenOne(!openOne);
                    }}
                  >
                    <div className={`navbar-link ${openOne ? "selected" : ""}`}>
                      {" "}
                      {/* Identificando quando estiver clicado (selecionado) aparecer diferente */}
                      <p>
                        Planos de ensinos{" "}
                        <ChevronDown className="icon-dropdown" />{" "}
                      </p>
                    </div>
                  </div>

                  <li>
                    <div
                      className={`dropdown-menu ${
                        openOne ? "active" : "inactive"
                      }`}
                      //TODO: Transformar textos responsivos
                    >
                      {" "}
                      {/* menu */}
                      <DropdownItem
                        to="/plansensinoespc"
                        icon={<CodeXml size={20} />}
                        text={"Desenvolvimento de sistemas"}
                      />
                      <DropdownItem
                        to="#"
                        icon={<Settings size={20} />}
                        text={"Eletromecânica"}
                      />
                      <DropdownItem
                        to="#"
                        icon={<ChartLine size={20} />}
                        text={"Logística"}
                      />
                      <DropdownItem
                        to="#"
                        icon={<Folder size={20} />}
                        text={"Administração"}
                      />
                      <DropdownItem
                        to="/plansensino"
                        icon={<GalleryVerticalEnd size={20} />}
                        text={"Geral"}
                      />
                    </div>
                  </li>
                </li>

                <NavLink
                  className={({ isActive }) =>
                    isActive ? "navbar-link active last" : "navbar-link"
                  }
                  to="/planscourse"
                >
                  <p> Planos de curso</p>
                </NavLink>
                {/* <li><Link className="navbar-link" to="/">Planos de curso</Link></li> */}
              </ul>
            </div>

            <div className="Icons">
              <div className="icon-list">
                <ul>
                  <li className="notification-dropdown">
                    <div
                      className="li-bell"
                      onClick={() => {
                        setOpenTwo(!openTwo);
                      }}
                      ref={notRef}
                    >
                      <div className="link-bell">
                        <FontAwesomeIcon icon={faBell} className="iconsBell" />
                      </div>
                    </div>

                    <li>
                      <div
                        className={`dropdown-notification ${
                          openTwo ? "ativo" : "inactive"
                        }`}
                      >
                        <DropdownNotification
                          to="/homeopp"
                          text={
                            "O professor Giovani respondeu ao seu comentário."
                          }
                          secondtext={"Toque aqui para visualizar."}
                        />
                      </div>
                    </li>
                  </li>{" "}
                  {/* Notificação */}
                  <li className="profile-notification">
                    {" "}
                    {/* Perfil */}
                    <div
                      className="profile"
                      onClick={() => {
                        setOpenThree(!opentThree);
                      }}
                      ref={notRefP}
                    >
                      <div className="profileIcon">
                        <FontAwesomeIcon icon={faUser} className="not-icons" />
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div
                          className={`dropdown-profile ${
                            opentThree ? "activeOne" : "inactiveOne"
                          }`}
                        >
                          <DropdownProfile
                            to="/profile"
                            icon={<UserPen size={20} />}
                            text={"Visualizar Perfil"}
                          />
                          <DropdownProfile
                            to="/"
                            icon={<LogOut size={20} />}
                            text={"Sair"}
                            onClick={logout} // Chama a função de logout ao clicar
                          />
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="menu-mobile">
              {/* Ícone de hambúrguer para mobile */}
              <NavLink
                to={"#"}
                className="hamburger-menu"
                onClick={() => setMenuOpen(!MenuOpen)}
              >
                <p>
                  {MenuOpen ? (
                    <X className="x-icon" size={35} />
                  ) : (
                    <Menu className="hamburguer" size={35}/>
                  )}
                </p>
              </NavLink>

              <div
                /* className="menulist" */ className={`menu ${
                  MenuOpen ? "open" : ""
                }`}
              >
                <ul>
                  <li
                    className={`dropdown ${DropdownMobileOpen ? "open" : ""}`}
                  >
                    <div
                      className="dropdownMobile"
                      onClick={toggleDropdwonMobile}
                    >
                      <p>
                        Planos de ensinos{" "}
                        <ChevronDown className="icon-dropdownMobile" />{" "}
                      </p>
                    </div>

                    {DropdownMobileOpen && (
                      <ul className="dropdown-Mobile">
                        <li>
                          <a href="#">Administração</a>
                        </li>
                        <li>
                          <a href="#">Desenvolvimento de Sistemas</a>
                        </li>
                        <li>
                          <a href="#">Eletromecânica</a>
                        </li>
                        <li>
                          <a href="#">Logística</a>
                        </li>
                        <li>
                          <a href="#">Geral</a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <NavLink /* identificando se o caminho da página selecionada corresponde */
                      className="dropdownMobile"
                      to="#"
                    >
                      <p>Plano de curso</p>
                    </NavLink>
                  </li>

                  <li>
                    <div
                      className="dropdownMobile"
                      onClick={toggleDropdwonMobileProfile}
                    >
                      <p>
                        Perfil <ChevronDown className="icon-dropdownMobile" />{" "}
                      </p>
                    </div>

                    {ProfileDropdownOpen && (
                      <ul className="dropdownProfileMob">
                        <li>
                          <a href="#">Visualizar perfil</a>
                        </li>
                        <li>
                          <a href="#">Sair</a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
