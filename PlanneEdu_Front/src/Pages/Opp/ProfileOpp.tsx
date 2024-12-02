/* Images */
import { KeyRound, Mail, Phone } from "lucide-react";
import Background from "../../assets/backgroundProfile.svg";
/* import User from "../../../public/user-profile.svg";
 */import ProfileForma from "../../../public/profile-forma.svg";

import "../../Css/Teacher/Profile.css";

/* 'import { useState } from "react";' */
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import React, { useEffect, useState } from "react";
import { profileOpp, updatePassword } from "../../Services/Axios";
import { toast } from "sonner";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";

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
}

export function ProfileOpp() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState<ProfileData | null>(null);

  useEffect(() => {
    const getOppProfile = async () => {
      try {
        const response = await profileOpp();
        setUser(response.user); // Acessando o campo `user` diretamente
        console.log("Perfil do Usuário:", response.user);
      } catch (error: any) {
        console.error("Erro ao carregar o perfil:", error.message);
        toast.error(error.message || "Não foi possível encontrar seus dados");
      }
    };

    getOppProfile();
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
    <section className="profileOpp">
      <NavBarOpp />

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

          <div className="leftSideOpp">
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
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="buttonsProfile" id="buttonsProfile">
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

      <div className="nameProfile">
        <img src={User} alt="" />
        <p>Marina Fonseca Neves</p>
      </div>

      <div className="infoProfile">
        <div className="infoProfile-img">
          <img src={ProfileForma} alt="" />
        </div>

        <div className="infosProfile">
          <div className="nif">
            <KeyRound className="nifIcon" />
            <p className="textProfile">15639479</p>
          </div>

          <div className="contatoProfile">
            <h1>Informações de contato:</h1>

            <div className="emailPersonal">
              <Mail className="mailIcon" />
              <p className="textProfile">mar.fonsves@gmail.com</p>
            </div>

            <div className="phone">
              <Phone className="phoneIcon" />
              <p className="textProfile">(11) 9785-5975</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
