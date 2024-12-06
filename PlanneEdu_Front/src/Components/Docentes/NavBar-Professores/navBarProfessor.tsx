import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useRef, useState } from "react";
import { UserPen, LogOut } from "lucide-react";
import LogoName from "../../../assets/logoname.svg";
import "../NavBar-Professores/navBarProfessor.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface DropdownProfileProps {
  icon: ReactNode;
  text: string;
  to: string;
  onClick?: () => void;
}

function DropdownProfile({ icon, text, to, onClick }: DropdownProfileProps) {
  return (
    <NavLink to={to} className="dropdownProfile" onClick={onClick}>
      <i className="icon">{icon}</i>
      <span className="menu-text">{text}</span>
    </NavLink>
  );
}

export function NavBarProfessor() {
  const [opentThree, setOpenThree] = useState(false);

  const notRefP = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notRefP.current && !notRefP.current.contains(e.target as Node)) {
        setOpenThree(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <section className="navbar-prof">
      <nav>
        <div className="navbarOne">
          {/* Logo */}
          <div className="nav-logo">
            <Link to="/homeprofessor">
              <img src={LogoName} alt="Logo" />
            </Link>
          </div>

          {/* Links principais */}
          <ul className="navbar-nav">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
              to="/homeprofessor"
            >
              <p>Início</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
              to="/plansensino"
            >
              <p>Planos de ensino</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
              to="/planscourse"
            >
              <p>Planos de curso</p>
            </NavLink>
          </ul>

          {/* Ícone do perfil com dropdown */}
          <div className="Icons">
            <div
              className="profile"
              onClick={() => {
                setOpenThree(!opentThree);
              }}
              ref={notRefP}
            >
              <FontAwesomeIcon icon={faUser} className="not-icons" />
            </div>
            <ul>
              <li>
                <div
                  className={`dropdown-profile ${
                    opentThree ? "activeOne" : "inactiveOne"
                  }`}
                >
                  <DropdownProfile
                    to="/profileteacher"
                    icon={<UserPen size={20} />}
                    text="Visualizar Perfil"
                  />
                  <DropdownProfile
                    to="/login"
                    icon={<LogOut size={20} />}
                    text="Sair"
                    onClick={logout}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
