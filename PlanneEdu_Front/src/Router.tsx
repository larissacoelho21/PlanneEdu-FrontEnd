import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { PasswordReset } from './Pages/PasswordReset';
import { VerificationEmail } from './Pages/Verification';
import { NavBarProfessor } from './Components/NavBar-Professores/navBarProfessor';
import { Home } from './Pages/Teacher/Home';
import { ClassTeacher } from './Pages/Teacher/ClassTeacher';
import { PlanEnsino } from './Pages/Teacher/PlanEnsino';
import { ViewActivity } from './Pages/Teacher/ViewActivity';
import { NavBarOpp } from './Components/NavBar-Opp/navBarOpp';

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
                </Routes>
        </BrowserRouter>

    )
}


export default Router;