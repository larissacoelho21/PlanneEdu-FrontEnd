/* import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface PrivateRouteProps {
    allowedRoles: string[]; // Roles permitidas
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage

    if (!token) {
        console.log("Nenhum token encontrado. Redirecionando para /unauthorized.");
        return <Navigate to="/unauthorized" replace />;
    }

    try {
        // Decodificar o token
        const decodedToken: any = jwtDecode(token);

        console.log("Token decodificado:", decodedToken);

        // Obter o nível de acesso do token
        const userRole = decodedToken.nivelAcesso;

        console.log("Nível de acesso encontrado:", userRole);
        console.log("Roles permitidos:", allowedRoles);

        // Verificar se o nível de acesso do usuário está nas roles permitidas
        if (allowedRoles.includes(userRole)) {
            return <Outlet />; // Renderiza o conteúdo da rota protegida
        } else {
            console.log("Acesso negado. Redirecionando para /unauthorized.");
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        console.error("Erro ao processar o token:", error);
        return <Navigate to="/unauthorized" replace />;
    }
};

export default PrivateRoute;
 */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface PrivateRouteProps {
    allowedRoles: string[]; // Roles permitidas
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage

    if (!token) {
        console.log("Nenhum token encontrado. Redirecionando para /unauthorized.");
        return <Navigate to="/unauthorized" replace />;
    }


    try {
        // Decodificar o token
        const decodedToken: any = jwtDecode(token);

        console.log("Token decodificado:", decodedToken);

        // Obter o nível de acesso do token
        const userRole = decodedToken.nivelAcesso;

        console.log("Nível de acesso encontrado:", userRole);
        console.log("Roles permitidos:", allowedRoles);

        // Verificar se o nível de acesso do usuário está nas roles permitidas
        if (allowedRoles.includes(userRole)) {
            return <Outlet />; // Renderiza o conteúdo da rota protegida
        } else {
            toast.error("Você não tem permissão para acessar esta página.");
            console.log("Acesso negado. Redirecionando para /unauthorized.");
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        console.error("Erro ao processar o token:", error);
        toast.error("Erro ao processar o token. Faça login novamente.");
        return <Navigate to="/unauthorized" replace />;
    }
};

export default PrivateRoute;
