import axios from "axios";
import { toast } from "sonner";

const BaseUrl = "https://planneedu-back.onrender.com"; // Substitua com sua URL base

export const login = async (nif: string, password: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/auth/login`, {
      nif: nif,
      password: password,
    });

    return response.data; // Retorna os dados da resposta se tudo ocorrer bem
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "valores não encontrados");
    }
    throw new Error("Erro ao tentar realizar login");
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

  const promise = () => new Promise((resolve) => setTimeout(() => resolve, 1000));
  
  const timeout = 5000; // Tempo máximo para a requisição em milissegundos (5 segundos)
  let timeoutReached = false;

  // Definindo o tempo de expiração para o toast
  const timeoutToastId = setTimeout(() => {
    timeoutReached = true;
    toast.dismiss(toastId); // Remove o toast de carregamento
    toast.warning('O tempo de espera excedeu! Tente novamente.');
    setIsLoading(false); // Finaliza o estado de carregamento
  }, timeout);

  // Função para lidar com o sucesso da requisição
  const handleSuccess = (response: any) => {
    clearTimeout(timeoutToastId);
    console.log('E-mail enviado:', response.data);
    localStorage.setItem('emailValue', emailValue); // Armazena o e-mail no localStorage

    toast.dismiss(toastId);
    toast.success('E-mail enviado com sucesso! Verifique sua caixa de entrada.');
    setIsLoading(false); // Finaliza o estado de carregamento
    navigate('/verificacaoemail');
  };

  // Função para lidar com o erro da requisição
  const handleError = (error: any) => {
    clearTimeout(timeoutToastId); 
    setIsLoading(false); 
    toast.dismiss(toastId); // Remove o toast de carregamento
    toast.error('Não foi possível enviar o e-mail, tente novamente'); // Exibe a mensagem de erro
    console.error('Erro ao enviar e-mail: ', error);
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
