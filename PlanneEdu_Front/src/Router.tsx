import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { PasswordReset } from './Pages/PasswordReset';
import { VerificationEmail } from './Pages/Verification';
import { Home } from './Pages/Teacher/Home';
import { ClassTeacher } from './Pages/Teacher/ClassTeacher';
import { PlanEnsino } from './Pages/Teacher/PlanEnsino';
import { ViewActivity } from './Pages/Teacher/ViewActivity';
import { PlanEnsinoEspc } from "./Pages/Teacher/PlanEnsinoEspc";
import { NavBarOpp } from './Components/Opp/NavBar-Opp/navBarOpp';
import { ProfileTeacher } from './Pages/Teacher/Profile';
import { AddPlans } from './Pages/Teacher/AddPlans';
import { HomeOpp } from './Pages/Opp/HomeOpp';
import { CursosOpp } from './Pages/Opp/CursosOpp';
import { TurmaOpp } from './Pages/Opp/TurmaOpp';
import { PlanoCursoOpp } from './Pages/Opp/PlanoCursoOpp';
import { AddActivity } from './Pages/Teacher/AddActivity';
import { AddCourse } from './Pages/Opp/AddCourse';
import { AddPlanoCurso } from './Pages/Opp/AddPlanoCursoOpp';
import { Competencias } from './Components/PlanoDeCurso/Competencias';

//criando rotas e caminhos 
const Router: React.FC = () => {
    return (
       <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/redefinicaosenha' element={<PasswordReset />}></Route>
                    <Route path='/verificacaoemail' element={<VerificationEmail />}></Route>
                    <Route path='/navbaropp' element={<NavBarOpp />}></Route>
                    <Route path='/homeprofessor' element={<Home />}></Route>
                    <Route path='/addatividade' element={<AddActivity />}></Route>
                    <Route path='/turmaprofessor' element={<ClassTeacher/>}></Route>
                    <Route path='/plansensino' element={<PlanEnsino />}></Route>
                    <Route path='/visualizaratvd' element={<ViewActivity/>}></Route>
                    <Route path='/plansensinoespc' element={<PlanEnsinoEspc />} />
                    <Route path='/profile' element={<ProfileTeacher />} />
                    <Route path='/addplans' element={<AddPlans />} />
                    <Route path='/homeopp' element={<HomeOpp/>}/>
                    <Route path='/cursosopp' element={<CursosOpp/>}/>
                    <Route path='/turmaopp' element={<TurmaOpp/>}/>
                    <Route path='/planocursoopp' element={<PlanoCursoOpp/>}/>
                    <Route path='/addcurso' element={<AddCourse/>}/>
                    <Route path='/addplancurso' element={<AddPlanoCurso/>}/>
                    <Route path='/addComp' element={<Competencias/>}/>
                    
                </Routes>
        </BrowserRouter>

    )
}


export default Router;