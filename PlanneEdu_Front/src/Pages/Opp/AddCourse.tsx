import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddCourse.css";

export function AddCourse () {
    return (
        <section className="add-new-course">
            <SubNavbar/>

            <div className="introduction-course">
                <h1>Adicione um novo curso</h1>
                <h2>Todos os campos são obrigatórios</h2>
            </div>

            <div className="select-planne-course">
                <label htmlFor="" className="label-select">Selecione um plano de curso</label>
                <select name="" id="">
                    <option value=""></option>
                </select>
            </div>
        </section>
    )
}