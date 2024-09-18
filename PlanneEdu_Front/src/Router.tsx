import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { PasswordReset } from './Pages/PasswordReset';
import { VerificationEmail } from './Pages/Verification';
import { NavBarProfessor } from './Components/Docentes/NavBar-Professores/navBarProfessor';
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

//criando rotas e caminhos 
const Router: React.FC = () => {
    return (
       <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/redefinicaosenha' element={<PasswordReset />}></Route>
                    <Route path='/verificacaoemail' element={<VerificationEmail />}></Route>
                    <Route path='/navbar' element={<NavBarProfessor />}></Route>
                    <Route path='/navbaropp' element={<NavBarOpp />}></Route>
                    <Route path='/homeprofessor' element={<Home />}></Route>
                    <Route path='/turmaprofessor' element={<ClassTeacher/>}></Route>
                    <Route path='/plansensino' element={<PlanEnsino />}></Route>
                    <Route path='/visualizaratvd' element={<ViewActivity/>}></Route>
                    <Route path='/plansensinoespc' element={<PlanEnsinoEspc />} />
                    <Route path='/profile' element={<ProfileTeacher />} />
                    <Route path='/addplans' element={<AddPlans />} />
                    <Route path='homeopp' element={<HomeOpp/>}/>
                    <Route path='cursosopp' element={<CursosOpp/>}/>
                </Routes>
        </BrowserRouter>

    )
}


export default Router;