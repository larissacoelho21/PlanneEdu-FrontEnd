import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

/* Login */
import { Login } from "./Pages/Login";
import { PasswordReset } from "./Pages/PasswordReset";
import { VerificationEmail } from "./Pages/Verification";

/* Professor */
import { Home } from "./Pages/Teacher/Home";
import { ClassTeacher } from "./Pages/Teacher/ClassTeacher";
import { PlanEnsino } from "./Pages/Teacher/PlanEnsino";
import { ViewActivity } from "./Pages/Teacher/ViewActivity";
import { AddActivity } from "./Pages/Teacher/AddActivity";
import { PlanEnsinoEspc } from "./Pages/Teacher/PlanEnsinoEspc";
import { ProfileTeacher } from "./Pages/Teacher/ProfileTeacher";
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
import { AddClass } from "./Pages/Opp/AddClass";
import { ProfileOpp } from "./Pages/Opp/ProfileOpp";

/* Landing Page */
import { LandingPage } from "./Pages/LandingPage";
import { ErrorPage } from "./Pages/ErrorPage";

// Componente Router
const Router: React.FC = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Efeito para monitorar o tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    // Adiciona o evento de resize
    window.addEventListener("resize", handleResize);

    // Verifica a largura inicial da tela
    handleResize();

    // Limpeza do evento
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Se a tela for menor que 800px, redireciona para /login ao tentar acessar /
    if (isMobile && window.location.pathname === "/") {
      navigate("/login");
    }
  }, [isMobile, navigate]);

  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />
      <Route path="/redefinicaosenha" element={<PasswordReset />} />
      <Route path="/verificacaoemail" element={<VerificationEmail />} />
      
      {/* Professor */}
      <Route path="/homeprofessor" element={<Home />} />
      <Route path="/addatividade" element={<AddActivity />} />
      <Route path="/turmaprofessor" element={<ClassTeacher />} />
      <Route path="/plansensino" element={<PlanEnsino />} />
      <Route path="/visualizaratvd" element={<ViewActivity />} />
      <Route path="/plansensinoespc" element={<PlanEnsinoEspc />} />
      <Route path="/profileteacher" element={<ProfileTeacher />} />
      <Route path="/addplans" element={<AddPlans />} />
      <Route path="/planscourse" element={<PlanCourse />} />
      
      {/* Opp */}
      <Route path="/homeopp" element={<HomeOpp />} />
      <Route path="/cursosopp" element={<CursosOpp />} />
      <Route path="/turmaopp" element={<TurmaOpp />} />
      <Route path="/planocursoopp" element={<PlanoCursoOpp />} />
      <Route path="/addcurso" element={<AddCourse />} />
      <Route path="/addplancurso" element={<AddPlanoCurso />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path="/manageteachers" element={<ManageTeachers />} />
      <Route path="/profileopp" element={<ProfileOpp />} />
      <Route path="/addclass" element={<AddClass />} />
      
      {/* Página Inicial */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Rota para Páginas Não Encontradas */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

// Componente principal
const App: React.FC = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
