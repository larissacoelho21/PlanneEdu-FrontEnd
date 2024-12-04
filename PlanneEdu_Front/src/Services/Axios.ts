import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BaseUrl = "https://planneedu-back.onrender.com"; // Substitua com sua URL base

/* ======================= Toast de carregamento  ============================= */
export const axiosWithToast = async <T>(
  config: AxiosRequestConfig,
  loadingMessage = "Carregando...",
  successMessage?: string,
  timeoutMessage = "O tempo de espera excedeu! Tente novamente.",
  timeout = 10000
): Promise<T> => {
  let timeoutReached = false;

  // Exibe o toast de carregamento
  const toastId = toast.loading(loadingMessage, { duration: timeout });

  // Promise de timeout que dispara caso a requisição demore muito
  const timeoutPromise = new Promise<null>((_, reject) => {
    setTimeout(() => {
      timeoutReached = true;
      toast.error(timeoutMessage); // Exibe mensagem de erro caso o timeout aconteça
      reject(new Error("Timeout reached"));
    }, timeout);
  });

  try {
    // Faz a requisição com timeout usando Promise.race
    const response = await Promise.race([axios(config), timeoutPromise]);

    if (!timeoutReached) {
      toast.success(successMessage || "Requisição realizada com sucesso!"); // Mensagem de sucesso
    }

    // Aqui, vamos acessar a propriedade "data" da resposta e retorná-la
    return (response as any).data; // Retorna os dados da requisição
  } catch (error) {
    if (!timeoutReached) {
      toast.error("Erro na requisição."); // Exibe erro genérico
    }
    throw error; // Propaga o erro
  } finally {
    toast.dismiss(toastId); // Sempre limpa o toast de carregamento quando a operação termina
  }
};

/* ======================= Verificação  ============================= */
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

  const timeout = 10000; // Tempo máximo para a requisição em milissegundos (5 segundos)
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

export const verificacao = async (
  email: string,
  code: string,
  password: string,
  confirmPassword: string
): Promise<void> => {
  const navigate = useNavigate(); // Use o hook do React Router

  try {
    const response = await axios.post(`${BaseUrl}/auth/reset_password`, {
      email,
      code,
      password,
      confirmPassword,
    });

    // Sucesso na redefinição de senha
    toast.success("Nova senha criada com sucesso!");
    navigate("/login");
  } catch (error: any) {
    // Erro durante a solicitação
    const errorMessage =
      error.response?.data?.error || "Erro desconhecido ao redefinir a senha";
    toast.error(`Erro ao redefinir a senha: ${errorMessage}`);
    console.error(errorMessage);
    throw new Error(errorMessage);
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

/* function post - atualizando senha */ //TODO: Arrumar 
export const updatePassword = async (
  password: string, //senha atual
  newPassword: string,
  confirmPassword: string,
) => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.put(
      `${BaseUrl}/update_password`,
      { password, newPassword, confirmPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
        },
      }
    );
    console.log("Resposta da API:", response);

    toast.success("Senha cadastrada com sucesso");

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Não foi possível atualizar senha";
    toast.error(errorMessage);
    console.error("Erro ao cadastrar senha: ", error);
    
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
    const response = await axiosWithToast(
      {
        method: "POST",
        url: `${BaseUrl}/register`,
        data: userData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      } /* ,
      `${BaseUrl}/register`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }, */,
      "Cadastrando usuário...",
      "Novo usuário criado com sucesso!"
    );
    console.log("Resposta da API:", response);
    // Sucesso: Exibe o toast e retorna a resposta
    return response;
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

/* Função aparecendo todos usuarios cadastrados */
export const allUsers = async () => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${BaseUrl}/get_all_users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    console.log("Usuários carregados:", response);
    return response.data.users; // Retorna os dados da API
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao buscar os usuários";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/* Função deletando usuários */
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
    console.log(response.data.msg);
  } catch (error: any) {
    console.error(
      "Erro ao deletar usuário: ",
      error.response?.data?.error || error.message
    );
    throw new Error(
      error.response?.data?.error || "Erro ao deletar o usuário."
    );
  }
};

/* Função perfil opp */
export const profileOpp = async () => {
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
}

/* Função adicionando Plano de Curso */

export const backPLanCourse = async (teachingPlan: any) => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.post(`${BaseUrl}/my_user`, teachingPlan, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao enviar os dados:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Erro ao enviar os dados do plano de ensino."
    );
  }
};