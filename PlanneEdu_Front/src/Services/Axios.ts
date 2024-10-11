import axios from "axios";

const BaseUrl = "http://10.92.199.30:3000"; // Substitua com sua URL base

export const login = async (nif: string, password: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/auth/login`, {
      nif: nif,
      password: password
    });

    return response.data; // Retorna os dados da resposta se tudo ocorrer bem
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "valores não encontrados");
    }
    throw new Error("Erro ao tentar realizar login");
  }
};