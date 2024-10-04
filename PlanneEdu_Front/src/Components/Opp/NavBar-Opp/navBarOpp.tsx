/* Images */
import LogoName from "../../../assets/logoname.svg";

/* Icons do dropdown */
import {
  CodeXml,
  Settings,
  GalleryVerticalEnd,
  Folder,
  ChartLine,
  ChevronDown,
  UserPen,
  LogOut,
} from "lucide-react";

/* funções react */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useRef, useState } from "react";

/* css */
import "../NavBar-Opp/navBarOpp.css";
import { faBell, faMoon, faUser } from "@fortawesome/free-solid-svg-icons";

/* Criando interface para declarar as props do DropdownItem */
interface DropdownItemProps {
  icon: ReactNode /* React Node utilizado para aceitar icone(svg) ou string */;
  text: string /* nome do link */;
  to: string /* path para as páginas */;
}

/* props ciradas na Interface */
function DropdownItem({ icon, text, to }: DropdownItemProps) {
  return (
    <NavLink to={to} className="dropdownItem">
      {" "}
      {/* usado para navegar as páginas de forma renderizada */}
      <i className="icon">{icon}</i> {/* imagem */}
      <Link className="menu-a" to="#">
        {" "}
        {text}{" "}
      </Link>{" "}
      {/* Link */}
    </NavLink>
  );
}

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
    <NavLink to={to} className="dropdownNotification">
      <p className="paragrafo">{text}</p>
      <p className="sub-paragrafo">{secondtext}</p>
    </NavLink>
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
      <Link className="menu-a" to="#">
        {" "}
        {text}{" "}
      </Link>{" "}
      {/* Link */}
    </NavLink>
  );
}

export function NavBarOpp() {
  /* Criando função para identificarquando o dropdown esta ativo */
  const [openOne, setOpenOne] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [opentThree, setOpenThree] = useState(false);

  let menuRef = useRef<HTMLDivElement>(null);
  let notRef = useRef<HTMLDivElement>(null);
  let notRefP = useRef<HTMLDivElement>(null);

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
    <section className="navbar-opp">
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
          </div>

          <div className="left-side">
            <div className="nav-list" ref={menuRef}>
              <ul className="navbar-nav">
                <NavLink /* identificando se o caminho da página selecionada corresponde */
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                  to="/homeopp"
                >
                  {" "}
                  Início
                </NavLink>

                <NavLink /* identificando se o caminho da página selecionada corresponde */
                  className={({ isActive }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                  to="/cursosopp"
                >
                  {" "}
                  Cursos
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
                      Turmas <ChevronDown />
                    </div>
                  </div>

                  <li>
                    <div
                      className={`dropdownMenu ${
                        openOne ? "active" : "inactive"
                      }`}
                    >
                      {" "}
                      {/* menu */}
                      <DropdownItem
                        to="/"
                        icon={<CodeXml size={20} />}
                        text={"Desenvolvimento de sistemas"}
                      />
                      <DropdownItem
                        to="/"
                        icon={<Settings size={20} />}
                        text={"Eletromecânica"}
                      />
                      <DropdownItem
                        to="/"
                        icon={<ChartLine size={20} />}
                        text={"Logística"}
                      />
                      <DropdownItem
                        to="/"
                        icon={<Folder size={20} />}
                        text={"Administração"}
                      />
                      <DropdownItem
                        to="/"
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
                  to="/planocursoopp"
                >
                  Planos de curso
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    isActive ? "navbar-link active last" : "navbar-link"
                  }
                  to="/"
                >
                  Gerenciar docentes
                </NavLink>
              </ul>
            </div>

            <div className="Icons">
              <div className="icon-list" ref={notRef}>
                <ul>
                  <li className="notification-dropdown">
                    <div
                      className="li-bell"
                      onClick={() => {
                        setOpenTwo(!openTwo);
                      }}
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
                          to="#"
                          text={
                            "O professor Giovani respondeu ao seu comentário."
                          }
                          secondtext={"Toque aqui para visualizar."}
                        />
                      </div>
                    </li>
                  </li>

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
                            to="#"
                            icon={<UserPen size={20} />}
                            text={"Visualizar Perfil"}
                          />
                          <DropdownProfile
                            to="#"
                            icon={<LogOut size={20} />}
                            text={"Sair"}
                            onClick={logout} // Chama a função de logout ao clicar
                          />
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="li-notification">
                    <div className="secondPart">
                      <div className="darkmode">
                        <NavLink to="#" className="darkmodeIcon">
                          <FontAwesomeIcon
                            icon={faMoon}
                            className="not-icons"
                          />
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
    </section>
  );
}
