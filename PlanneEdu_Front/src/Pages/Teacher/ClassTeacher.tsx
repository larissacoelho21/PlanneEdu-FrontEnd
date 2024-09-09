import "../../Css/Teacher/ClassTeacher.css"

import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";

import SemesterTeacher from "../../assets/clock.svg"
import StudentsTeacher from "../../assets/peoples.svg"

export function ClassTeacher () {
    return (
        <section className="class-teacher">
    <div className="subnavbar-class">
        <SubNavbar />
    </div>

    <div className="box-info-class">
        <h1>Desenvolvimento de Sistemas | SESI 2023</h1>
        <div className="date-badge">
            <span>23/02/2023 — 18/12/2024</span>
        </div>
        <div className="infos-teacher">
            <div className="semester-teacher">
                <img src={SemesterTeacher} alt="" />
                <h1>4 semestres</h1>
            </div>
            <div className="students">
                <img src={StudentsTeacher} alt="" />
                <h1>35 alunos</h1>
            </div>
        </div>
    </div>

    <div className="buttons-class">
        
    </div>
</section>

    )
}