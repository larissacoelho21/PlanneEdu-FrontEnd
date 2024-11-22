import { BrowserRouter, Route, Routes } from "react-router-dom";
/* Login */
import { Login } from "./Pages/Login";
import { PasswordReset } from "./Pages/PasswordReset";
import { VerificationEmail } from "./Pages/Verification";

/* Teacher */
import { Home } from "./Pages/Teacher/Home";
import { ClassTeacher } from "./Pages/Teacher/ClassTeacher";
import { PlanEnsino } from "./Pages/Teacher/PlanEnsino";
import { ViewActivity } from "./Pages/Teacher/ViewActivity";
import { AddActivity } from "./Pages/Teacher/AddActivity";
import { PlanEnsinoEspc } from "./Pages/Teacher/PlanEnsinoEspc";
import { ProfileTeacher } from "./Pages/Teacher/Profile";
import { AddPlans } from "./Pages/Teacher/AddPlans";

/* Opp */
import { HomeOpp } from "./Pages/Opp/HomeOpp";
import { CursosOpp } from "./Pages/Opp/CursosOpp";
import { TurmaOpp } from "./Pages/Opp/TurmaOpp";
import { PlanoCursoOpp } from "./Pages/Opp/PlanoCursoOpp";
import { AddCourse } from "./Pages/Opp/AddCourse";
import { AddPlanoCurso } from "./Pages/Opp/AddPlanoCursoOpp";
import { AddUser } from "./Pages/Opp/AddUser";
import { PlanCourse } from "./Pages/Teacher/PlanCourse";
import { ManageTeachers } from "./Pages/Opp/ManageTeachers";
import { LandingPage } from "./Pages/LandingPage";

//criando rotas e caminhos
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/redefinicaosenha" element={<PasswordReset />}></Route>
        <Route path="/verificacaoemail" element={<VerificationEmail />}></Route>
        {/* Professor */}
        <Route path="/homeprofessor" element={<Home />}></Route>
        <Route path="/addatividade" element={<AddActivity />}></Route>
        <Route path="/turmaprofessor" element={<ClassTeacher />}></Route>
        <Route path="/plansensino" element={<PlanEnsino />}></Route>
        <Route path="/visualizaratvd" element={<ViewActivity />}></Route>
        <Route path="/plansensinoespc" element={<PlanEnsinoEspc />} />
        <Route path="/profile" element={<ProfileTeacher />} />
        <Route path="/addplans" element={<AddPlans />} />
        <Route path="/planscourse" element={<PlanCourse/>}/>
        {/* Opp */}
        <Route path="/homeopp" element={<HomeOpp />} />
        <Route path="/cursosopp" element={<CursosOpp />} />
        <Route path="/turmaopp" element={<TurmaOpp />} />
        <Route path="/planocursoopp" element={<PlanoCursoOpp />} />
        <Route path="/addcurso" element={<AddCourse />} />
        <Route path="/addplancurso" element={<AddPlanoCurso />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/managetechers" element={<ManageTeachers />} />
        <Route path="/landingpage" element={<LandingPage />} />
        {/* Lading Page */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
