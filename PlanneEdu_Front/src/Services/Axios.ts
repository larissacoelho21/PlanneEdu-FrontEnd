import axios from "axios";

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

/* Profile */

/* function get - buscando do banco de dados as informações e trazendo para a tela */
/* export const profile = async () => {
  try {
    const response = await axios.get(`${BaseUrl}/my_user`);
      
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "valores não encontrados");
    }
    throw new Error("Erro ao encontrar seus dados");
  }
} */

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
  newPassword: string,
) => {
  try {
    /* const response = await axios.put(`${BaseUrl}/update`, {
      currentPassword,
      newPassword,
    }); */
    const token = localStorage.getItem('authToken');  // Supondo que o token esteja no localStorage
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
