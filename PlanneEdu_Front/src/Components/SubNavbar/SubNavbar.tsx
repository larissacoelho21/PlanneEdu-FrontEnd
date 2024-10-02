import arrowBack from "../../assets/arrowBack.svg";
import logoName from "../../assets/logoname.svg"

import "../SubNavbar/SubNavbar.css"

export function SubNavbar () {
    return (
        <section className="sub-navbar">
            <div className="elements">
                <img src={arrowBack} alt="" />
                <img src={logoName} alt="" />
            </div>
        </section>
    )
}