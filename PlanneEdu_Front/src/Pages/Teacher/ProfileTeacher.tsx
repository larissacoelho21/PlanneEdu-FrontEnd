/* Images */
import { KeyRound, Mail, Phone } from "lucide-react";
import Background from "../../assets/backgroundProfile.svg";

import "../../Css/Teacher/Profile.css";
/* 'import { useState } from "react";' */
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import React, { useEffect, useState } from "react";
import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";
import { profile, updatePassword } from "../../Services/Axios";
import { toast } from "sonner";

/* Interface para o InputField */
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ id, label, type = "text", value }: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value !== "");
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="Label" htmlFor={id}>
        {label}
      </label>
      <input
        className="Input"
        id={id}
        type={type}
        onChange={handleInputChange}
      />
    </fieldset>
  );
}

/* Conexão Back-End */

/* Definindo propriedades para chamar da api */
interface ProfileData {
  nome: string;
  sobrenome: string;
  nif: string;
  telefone: string;
  email: string;
  turmasAtribuidas: string[];
  cursosAtribuidos: string[];
}

export function ProfileTeacher() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState<ProfileData | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await profile();
        setUser(response.user); // Acessando o campo `user` diretamente
        console.log("Perfil do Usuário:", response.user);
      } catch (error: any) {
        console.error("Erro ao carregar o perfil:", error.message);
        toast.error(error.message || "Não foi possível encontrar seus dados");
      }
    };

    getUserProfile();
  }, []);

  //Função para atualizar senha
  const handlePassword = async () => {
    try {
      await updatePassword(currentPassword, password, confirmPassword);
      toast.success("Senha cadastrada com sucesso");
    } catch (error: any) {
      toast.error(
        error.message ||
          "Não foi possível cadastrar a nova senha, tente novamente"
      );
      console.error("Erro ao cadastrar senha: ", error);
    }
  };

  return (
    <section className="profileTeacher">
      <NavBarProfessor />

      <div className="introProfile">
        <h1>Perfil</h1>
        <hr />
      </div>

      <div className="cardProfile">
        <div className="container-profile">
          <div className="rightSide">
            <div className="img">
              <img src={Background} alt="" />
            </div>
          </div>

          <div className="leftSide">
            {user && (
              <div className="info-profile">
                <div className="name">
                  <h3>
                    {user.nome} {user.sobrenome}
                  </h3>
                </div>

                <div className="nif">
                  <KeyRound className="nifIcon" />
                  <p className="textProfile">{user.nif}</p>
                </div>

                <div className="emailPersonal">
                  <Mail className="mailIcon" />
                  <p className="textProfile">{user.email}</p>
                </div>

                <div className="phone">
                  <Phone className="phoneIcon" />
                  <p className="textProfile">{user.telefone}</p>
                </div>

                <div className="courses-profile">
                  <h3>Cursos atribuídos</h3>
                  {user?.cursosAtribuidos?.length ? (
                    user.cursosAtribuidos.map((curso, index) => (
                      <p key={index}>{curso}</p>
                    ))
                  ) : (
                    <p>Nenhum curso atribuído.</p>
                  )}
                </div>

                <div className="classes-profile">
                  <h3>Turmas atribuídas</h3>
                  {user?.turmasAtribuidas?.length ? (
                    user.turmasAtribuidas.map((turma, index) => (
                      <p key={index}>{turma}</p>
                    ))
                  ) : (
                    <p>Nenhuma turma atribuída.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="buttonsProfile">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div className="password-button">
              <button>Trocar de senha</button>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay
              className="DialogOverlay"
              aria-labelledby="dialog-title"
            />
            <Dialog.Content className="DialogContent">
              <Dialog.Title
                className="DialogTitle"
                id="dialog-title"
                style={{
                  display: "flex",
                  marginTop: 10,
                  justifyContent: "center",
                }}
              >
                Trocar senha
              </Dialog.Title>

              <form
                onSubmit={async (e) => {
                  e.preventDefault(); // Evita o reload da página
                  await handlePassword(); // Chama sua lógica de atualizar a senha
                }}
              >
                <div className="Fieldset">
                  <InputField
                    id="currentPassword"
                    label="Senha atual"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <InputField
                    id="newPassword"
                    label="Nova senha"
                    type="password"
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputField
                    id="confirmPassword"
                    label="Confirmar nova senha"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 25,
                    justifyContent: "center",
                  }}
                >
                  <button type="submit" className="Button save">
                    Salvar
                  </button>
                </div>
              </form>
              <Dialog.Close asChild>
                <div aria-label="Close">
                  <Cross2Icon className="IconButton" />
                </div>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}
