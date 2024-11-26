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

      toast.dismiss(toastId);

      // Armazenar informações no localStorage
      localStorage.setItem("userName", data.user.nome);
      localStorage.setItem("Authorization", data.token);

      // Verificar se é usuário padrão
      if (data.user.defaultUser) {
        navigate("/profile");
        toast.info("Por favor, atualize suas informações.");
      }
      // Verificar nível de acesso
      else if (data.user.nivelAcesso === "opp") {
        navigate("/homeopp");
        toast.success("Bem-vindo, OPP!");
      } else if (data.user.nivelAcesso === "docente") {
        navigate("/homeprofessor");
        toast.success("Bem-vindo, Docente!");
      } else {
        toast.error("Nível de acesso desconhecido.");
      }
    }

    setIsLoading(false);
    return response.data; // Retorna os dados da resposta se tudo ocorrer bem
  } catch (error: any) {
    clearTimeout(timeoutToastId);
    const errorMessage =
      error.response?.data?.error || "NIF ou senha incorretos, tente novamente";
    toast.dismiss(toastId);
    toast.error(errorMessage);

    setIsLoading(false);
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
    !timeoutReached && handleSuccess(response);
  } catch (error: any) {
    !timeoutReached && handleError(error);
  }
};

/* ======================= Docente ============================= */

/* Requisição do perfil do usuário */
export const profile = async () => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${BaseUrl}/my_user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    return response.data; // Retorna os dados da API
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao encontrar seus dados";
  }
};

/* function post - atualizando senha */
export const updatePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const token = localStorage.getItem("authToken"); // Supondo que o token esteja no localStorage
    if (!token) {
      throw new Error("Token de autenticação não encontrado. Por favor, faça login novamente.");
    }
    const response = await axios.put(
      `${BaseUrl}/update_password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
        },
      }
    );
    console.log("Resposta da API:", response);

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Erro ao tentar atualizar a senha");
    }
    throw new Error("Erro ao tentar cadastrar senha");
  }
};

/* ======================= Opp ============================= */

/* Função adicionando usuário */
export const RegisterUser = async (userData: {
  nome: string;
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
  if (!token) {
    toast.error("Usuário não autenticado. Faça login novamente.");
    throw new Error("Token de autenticação ausente.");
  }
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
  }
  catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro desconhecido na conexão com o servidor";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }/*  catch (error: any) {
    // Erro: Exibe o toast e lança o erro para ser tratado
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Não foi possível cadastrar o usuário"
      );
    } else {
      toast.error("Erro desconhecido na conexão com o servidor");
      throw new Error("Erro desconhecido na conexão com o servidor");
    }
  } */
}

export const allUsers = async (accessLevel: string) => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${BaseUrl}/get_users/${accessLevel}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    return response.data.users; // Retorna os dados da API
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao encontrar seus dados";
  }
};


export const deleteUser = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.delete(`${BaseUrl}/delete_user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });
    console.log(response.data.msg)
  } catch (error: any) {
    console.error("Erro ao deletar usuário: ", error.response?.data?.error || error.message);
    throw new Error(error.response?.data?.error || "Erro ao deletar o usuário.");
  }
}