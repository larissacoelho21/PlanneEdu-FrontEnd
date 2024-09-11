import "../../Css/Teacher/PlanEnsino.css";
import { NavBarProfessor } from "../../Components/NavBar-Professores/navBarProfessor";

/* importando icones para a construção da página */
import { ChevronRight } from 'lucide-react';
import { Settings } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { BookMarked } from 'lucide-react';
import { ChartLine } from 'lucide-react';

export function PlanEnsino() {
    return (
        <main>
            <div className="header">
                <NavBarProfessor />
            </div>
            <div className="Intro">
                <h1 className="Title">Planos de Ensino</h1>
                <h2 className="Description">Gerencie e compartilhe seus planos de ensino</h2>
                <div className="Line"></div>
            </div>
            <div className="Cards">
                <div className="Card">
                    <div className="Data">
                        <h3 className="Subject">Automação Industrial</h3>
                        <div className="tag-course">
                            <Settings size={20} color="white" />
                            <p>Eletromecânica</p>
                        </div>
                        <div className="Info">
                            <div className="Teacher">
                                <GraduationCap size={25} color="black" strokeWidth={2} />
                                <p>André Souza</p>
                            </div>
                            <div className="Class">
                                <BookMarked size={21} color="black" strokeWidth={2} />
                                <p>Noite 2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="Arrow">
                        <ChevronRight size={50} color="black" strokeWidth={1} />
                    </div>
                </div>

                <div className="Card">
                    <div className="Data">
                        <h3 className="Subject">Programação e Controle de Suprimentos</h3>
                        <div className="tag-course">
                            <ChartLine size={20} color="white" />
                            <p>Logística</p>
                        </div>
                        <div className="Info">
                            <div className="Teacher">
                                <GraduationCap size={25} color="black" strokeWidth={2} />
                                <p>Samanta Neves</p>
                            </div>
                            <div className="Class">
                                <BookMarked size={21} color="black" strokeWidth={2} />
                                <p>Manhã 2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="Arrow">
                        <ChevronRight size={50} color="black" strokeWidth={1} />
                    </div>
                </div>
            </div>
        </main>
    );
}
