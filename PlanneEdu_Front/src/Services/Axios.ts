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
        navigate("/profileopp");
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
      withCredentials: true,
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
    console.log(response);
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

/* function post - atualizando senha */
//TODO: Arrumar
export const updatePassword = async (
  password: string, //senha atual
  newPassword: string,
  confirmPassword: string
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

    toast.success("Senha cadastrada com sucesso");

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Não foi possível atualizar senha";
    toast.dismiss();
    toast.error(errorMessage);
    console.error("Erro ao cadastrar senha: ", error);
    throw error;
  }
};

/* Função aparecendo plano de curso */
export const allPlanCourse = async () => {
  const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
  console.log("Token enviado:", token);
  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }
  try {
    const response = await axios.get(`${BaseUrl}/coursePlan/get_all`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    const planosCurso = response.data.planosCurso.map((curso: any) => ({
      _id: curso._id,
      nome: curso.nome,
      qtdSemestre: curso.qtdSemestre,
      categoria: curso.categoria,
    }));

    console.log("Planos de cursos encontrados:", planosCurso);
    return planosCurso;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao buscar planos de curso";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/* Função fazer o download do pdf - plano e curso */
export const downloadPdf_PlanCourse = async (id: string) => {
  const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }

  try {
    const response = await axios.get(
      `${BaseUrl}/coursePlan/download_pdf/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
        },
        responseType: "blob", // Indica que o retorno será um arquivo binário
      }
    );

    /* 
    const fileUrl = response.data.url;
    console.log(fileUrl)
    window.open(fileUrl, '_blank'); */
        const fileUrl = response.data.url;
        console.log(fileUrl)
        window.open(fileUrl, '_blank'); */

    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : "default.pdf";
    const link = document.createElement("a");
    link.href = URL.createObjectURL(response.data);
    link.download = filename;
    link.click();
    console.log("Download realizado com sucesso!");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao realizar download do PDF";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};



//TODO: não funciona 
/* Função home, pegando todos as turmas do professor */
export const allTurmas = async () => {
  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    console.log("Token:", token);
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.get(`${BaseUrl}/class/mine_classes`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    console.log("Resposta da API:", response.data);

    const turmasData = response.data.turmasData.map((turma: any) => ({
      _id: turma.turma?._id || "Nome não disponível",
      nome: turma.turma?.nome || "Nome não disponível",
      turno: turma.turma?.turno || "Nome não disponível",
      dataInicio: turma.turma?.dataInicio || "Data não disponível",
      dataTermino: turma.turma?.dataTermino || "Data não disponível",
      qtdAlunos: turma.turma?.qtdAlunos || "Alunos não disponível",
      curso: turma.curso || "Curso não informado",
      semestres: turma.semestres || "Semestre não informado",
    }));

    console.log("Turmas encontradas :", turmasData);
    return turmasData;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao buscar turmas";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/* Função para aparecer todos os planos de ensino */
export const allPlanEns = async () => {

  try {
    const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }
    const response = await axios.get(`${BaseUrl}/teachPlan/get_all`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    const planosEnsin = response.data.planosEnsino.map((plano: any) => ({
      _id: plano._id,
      materia: plano.unidadeCurricular?.nome || "Não informado", // Nome da matéria
      curso: plano.curso?.planoCurso?.nome || "Não informado", // Nome do curso
      professor: plano.user?.nome || "Não informado", // Nome do professor
      turma: plano.turma?.nome || "Não informado", // Nome da turma
    }));

    console.log("Planos de ensino encontrados:", planosEnsin);
    return planosEnsin;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao buscar planos de ensino";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

}

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

//TODO: não funciona 
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

    const all_Users = response.data.users.map((getAll: any) => ({
      _id: getAll._id,
      nome: getAll.nome || "Não informado",
      sobrenome: getAll.sobrenome || "Não informado",
      nif: getAll.nif || "Não informado",
      telefone: getAll.telefone || "Não informado",
      email: getAll.email || "Não informado",
      /*  turmasAtribuidas: getAll.turmasAtribuidas?.nome || "Não informado",
      cursosAtribuidos: getAll.cursosAtribuidos?.nome || "Não informado", */
      turmasAtribuidas:
        getAll.turmasAtribuidas && getAll.turmasAtribuidas.length > 0
          ? getAll.turmasAtribuidas.map((turma: any) => turma.nome).join(", ")
          : "Nenhuma turma atribuída",
      cursosAtribuidos:
        getAll.cursosAtribuidos && getAll.cursosAtribuidos.length > 0
          ? getAll.cursosAtribuidos.map((curso: any) => curso.planoCurso?.nome).join(", ")
          : "Nenhum curso atribuído",
    }))

    console.log("Usuários carregados:", all_Users);
    return all_Users; // Retorna os dados da API
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
};

export const getAllCursos = async () => {
  const token = localStorage.getItem("Authorization"); // Obtém o token do localStorage
  console.log("Token enviado:", token);
  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }
  try {
    const response = await axios.get(`${BaseUrl}/course/get_all`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    });

    const Curso = response.data.cursos.map((curso: any) => ({
      _id: curso._id,
      nome: curso.planoCurso?.nome,
      categoria: curso.planoCurso?.categoria, 
      qtdSemestre: curso.planoCurso?.qtdSemestre,
    }));

    console.log("cursos encontrados:", Curso);
    return Curso;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao buscar cursos";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/* Função adicionando Plano de Curso */
export const backPlanCourse = async (coursePlan: {
  nome: string;
  categoria: string;
  objetivo: string;
  requisitosAcesso: string;
  competenciasProfissionais: string;
  cargaHoraria: number | null;
  qtdSemestre: number | null;
  semestre: {
    numero: number;
    unidadeCurricular: string[];
  }[];
  materias: {
    nome: string;
    cargaHoraria: number | null;
    objetivo: string;
    capaBasicaOuTecnica: string[];
    capaSocioemocional: string[];
    conhecimento: {
      topicos: {
        tituloTopico: string;
        subTopicos: {
          tituloSubtopico: string;
          detalhes: string[];
        }[];
      }[];
    };
    ambiente: string;
  }[];
}) => {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }
  try {
    const response = await axiosWithToast(
      {
        method: "POST",
        url: `${BaseUrl}/coursePlan/create`,
        data: coursePlan,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      "Cadastrando plano de curso...",
      "Plano de curso cadastrado com sucesso!"
    );
    return response;
  } catch (error: any) {
    const message =
      error.response?.data?.error ||
      "Erro desconhecido ao conectar com o servidor.";
    toast.error(message);
    throw new Error(message);
  }
};

/* Requisição dos cursos */
export const course = async () => {
  try {
    const token = localStorage.getItem("Authorization");
    console.log("Token encontrado:", token);

    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await axios.get(`${BaseUrl}/course/get_all`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    console.log("Resposta da API:", response);

    if (response.data && response.data.cursos) {
      const cursos = response.data.cursos.map((curso: any) => ({
        _id: curso._id,
        planoCurso: {
          _id: curso.planoCurso._id,
          nome: curso.planoCurso.nome,
          categoria: curso.planoCurso.categoria,
          cargaHoraria: curso.planoCurso.cargaHoraria,
          qtdSemestre: curso.planoCurso.qtdSemestre,
          tempoCurso: curso.planoCurso.tempoCurso,
        },
      }));

      console.log("Cursos encontrados:", cursos);
      return cursos;
    } else {
      throw new Error("A resposta da API não contém a propriedade 'cursos'.");
    }
  } catch (error: any) {
    console.error("Erro ao buscar cursos:", error);
    throw new Error(error.response?.data?.error || "Erro ao buscar cursos");
  }
};