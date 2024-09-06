import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { PasswordReset } from './Pages/PasswordReset';
import { VerificationEmail } from './Pages/Verification';
import { CreatePassword } from './Pages/CreatePassword';
import { NavBarProfessor } from './Components/NavBar-Professores/navBarProfessor';
import { HomeTeacher } from './Pages/HomeTeacher';

//criando rotas e caminhos 
const Router: React.FC = () => {
    return (
       <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/redefinicaosenha' element={<PasswordReset />}></Route>
                    <Route path='/verificacaoemail' element={<VerificationEmail />}></Route>
                    <Route path='/novasenha' element={<CreatePassword />}></Route>
                    <Route path='/homeprofessor' element={<HomeTeacher />}></Route>
                    <Route path='/navbar' element={<NavBarProfessor />}></Route>
                    

                </Routes>
        </BrowserRouter>

    )
}


export default Router;