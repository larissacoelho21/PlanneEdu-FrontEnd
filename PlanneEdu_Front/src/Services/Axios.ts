import axios from "axios";
import { toast } from "sonner";

const BaseUrl = "https://planneedu-back.onrender.com"; // Substitua com sua URL base

/* Login principal */
export const login = async (
  nif: string,
  password: string,
  setIsLoading: (loading: boolean) => void,
  navigate: (path: string) => void,
  toastId: any
) => {
  setIsLoading(true);
  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve, 1000));

  const timeout = 10000; // Tempo máximo para a requisição em milissegundos (5 segundos)
  let timeoutReached = false;

  const timeoutToastId = setTimeout(() => {
    timeoutReached = true;
    toast.dismiss(toastId); // Remove o toast de carregamento
    toast.warning("O tempo de espera excedeu! Tente novamente.");
    setIsLoading(false); // Finaliza o estado de carregamento
  }, timeout);

  try {
    const response = await axios.post(`${BaseUrl}/auth/login`, {
      nif: nif,
      password: password,
    });
    clearTimeout(timeoutToastId);

    if (!timeoutReached) {
      const { data } = response;
      setIsLoading(true); 

      // Armazenar informações no localStorage
      localStorage.setItem("userName", data.user.nome);
      localStorage.setItem("Authorization", data.token);

      // Verificar se é usuário padrão
      if (data.user.defaultUser) {
        setIsLoading(false);
        navigate("/profile");
        toast.info("Por favor, atualize suas informações.");
      }
      // Verificar nível de acesso
      else if (data.user.nivelAcesso === "opp") {
        setIsLoading(false);
        navigate("/homeopp");
        toast.success("Bem-vindo, OPP!");
      } else if (data.user.nivelAcesso === "docente") {
        setIsLoading(false);
        navigate("/homeprofessor");
        toast.success("Bem-vindo, Docente!");
      } else {
        toast.error("Nível de acesso desconhecido.");
      }
    }

    return response.data; // Retorna os dados da resposta se tudo ocorrer bem
  } catch (error: any) {
    clearTimeout(timeoutToastId);
    const errorMessage =
      error.response?.data?.error || "NIF ou senha incorretos, tente novamente";
    toast.dismiss(toastId);
    toast.error(errorMessage);
  }
};

/* Redefinição de senha - envio email */
export const postEmail = async (
  emailValue: string,
  setIsLoading: (loading: boolean) => void,
  navigate: (path: string) => void,
  toastId: any
) => {
  setIsLoading(true);

  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve, 1000));

  const timeout = 5000; // Tempo máximo para a requisição em milissegundos (5 segundos)
  let timeoutReached = false;

  // Definindo o tempo de expiração para o toast
  const timeoutToastId = setTimeout(() => {
    timeoutReached = true;
    toast.dismiss(toastId); // Remove o toast de carregamento
    toast.warning("O tempo de espera excedeu! Tente novamente.");
    setIsLoading(false); // Finaliza o estado de carregamento
  }, timeout);

  // Função para lidar com o sucesso da requisição
  const handleSuccess = (response: any) => {
    clearTimeout(timeoutToastId);
    console.log("E-mail enviado:", response.data);
    localStorage.setItem("emailValue", emailValue); // Armazena o e-mail no localStorage

    toast.dismiss(toastId);
    toast.success(
      "E-mail enviado com sucesso! Verifique sua caixa de entrada."
    );
    setIsLoading(false); // Finaliza o estado de carregamento
    navigate("/verificacaoemail");
  };

  // Função para lidar com o erro da requisição
  const handleError = (error: any) => {
    clearTimeout(timeoutToastId);
    setIsLoading(false);
    toast.dismiss(toastId); // Remove o toast de carregamento
    toast.error("Não foi possível enviar o e-mail, tente novamente"); // Exibe a mensagem de erro
    console.error("Erro ao enviar e-mail: ", error);
  };

  try {
    const response = await axios.post(`${BaseUrl}/auth/forgot_password`, {
      email: emailValue,
    });
    /* 
        console.log("E-mail enviado:", response.data);
        localStorage.setItem("emailValue", emailValue); // Armazena o e-mail no localStorage
    
        toast.dismiss(toastId);
        toast.success(
          "E-mail enviado com sucesso! Verifique sua caixa de entrada."
        );
        setIsLoading(false); // Finaliza o estado de carregamento
        navigate("/verificacaoemail"); // Navega para a próxima página */
    !timeoutReached && handleSuccess(response);
  } catch (error: any) {
    /* setIsLoading(false); // Finaliza o estado de carregamento em caso de erro
    toast.dismiss(toastId); // Remove o toast de carregamento
    toast.error("Não foi possível enviar o e-mail, tente novamente"); // Exibe a mensagem de erro
    console.error("Erro ao enviar e-mail: ", error); */
    !timeoutReached && handleError(error);
  }
};

/* ======================= Docente ============================= */

/* Requisição do perfil do usuário */
export const profile = async () => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    const response = await axios.get(`${BaseUrl}/my_user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Valores não encontrados");
    }
    throw new Error("Erro ao encontrar seus dados");
  }
};

/* function post - atualizando senha */
export const updatePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const token = localStorage.getItem("authToken"); // Supondo que o token esteja no localStorage
    const response = await axios.put(
      `${BaseUrl}/update`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "valores não encontrados");
    }
    throw new Error("Erro ao tentar cadastrar senha");
  }
};

/* ======================= Opp ============================= */

/* Função adicionando usuário */
export const RegisterUser = async (userData: {
  name: string;
  sobrenome: string;
  area: string;
  nif: string;
  password: string;
  nivelAcesso: string;
  email: string;
  telefone: string;
}) => {
  // Recuperando o token do localStorage
  const token = localStorage.getItem("Authorization");
  try {
    // Faz a chamada para o back-end
    const response = await axios.post(`${BaseUrl}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // Sucesso: Exibe o toast e retorna a resposta
    toast.success("Novo usuário criado com sucesso!");
    return response.data;
  } catch (error: any) {
    // Erro: Exibe o toast e lança o erro para ser tratado
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Não foi possível cadastrar o usuário"
      );
    } else {
      toast.error("Erro desconhecido na conexão com o servidor");
      throw new Error("Erro desconhecido na conexão com o servidor");
    }
  }
};
