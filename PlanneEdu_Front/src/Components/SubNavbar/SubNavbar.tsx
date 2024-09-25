import { useNavigate } from "react-router-dom";

import arrowBack from "../../assets/arrowBack.svg";
import logoName from "../../assets/logoname.svg";

import "../SubNavbar/SubNavbar.css";

export function SubNavbar() {
  const navigate = useNavigate();

  const handleArrowBack = () => {
    navigate(-1);
  };

  return (
    <section className="sub-navbar">
      <div className="elements">
        <img
          src={arrowBack}
          alt="Voltar"
          onClick={handleArrowBack}
          style={{ cursor: "pointer" }}
        />
        <img src={logoName} alt="" />
      </div>
    </section>
  );
}
