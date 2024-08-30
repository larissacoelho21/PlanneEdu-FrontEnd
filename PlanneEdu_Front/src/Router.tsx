import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';

//criando rotas e caminhos
const Router: React.FC = () => {
    return (
       <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
        </BrowserRouter>

    )
}


export default Router;