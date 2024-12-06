/* Images */
import { KeyRound, Mail, Phone } from "lucide-react";
import Background from "../../assets/backgroundProfile.svg";
import User from "../../assets/user-profile.svg";
import ProfileForma from "../../assets/profile-forma.svg";

import "../../Css/Teacher/Profile.css";

/* 'import { useState } from "react";' */
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import React, { useEffect, useState } from "react";
import { profileOpp, updatePassword, updateUser } from "../../Services/Axios";
import { toast } from "sonner";
import { NavBarOpp } from "../../Components/Opp/NavBar-Opp/navBarOpp";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

/* Interface para o InputField */
function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(value !== "");
  }, [value]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;
    setIsFilled(target.value !== "");
    onChange(event);
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
        value={value}
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
  nivelAcesso: string;
}

export function ProfileOpp() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      console.log("Dados enviados ao servidor:", {
        password,
        newPassword,
        confirmPassword,
      });
      await updatePassword(password, newPassword, confirmPassword);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Erro ao cadastrar senha: ", error);
    }
  };

  // Editar perfil opp
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [nome, setName] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [nif, setNif] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user) {
      setName(user.nome);
      setSobrenome(user.sobrenome);
      setNif(user.nif);
      setTelefone(user.telefone);
      setEmail(user.email);
    }
  }, [user]);

  const handleEditProfile = async () => {
    try {
      console.log("Dados enviados ao servidor:", {
        nome,
        sobrenome,
        nif,
        telefone,
        email,
      });

      await updateUser(nome, sobrenome, nif, telefone, email);

      toast.success("Perfil atualizado com sucesso!");
      setEditProfileOpen(false);
      window.location.reload();
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil.");
    }
  };

  return (
    /* ================ Desktop ======================= */
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
      {/* Dialog password */}
      <div className="buttonsProfile" id="buttonsProfile">
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputField
                    id="newPassword"
                    label="Nova senha"
                    type="password"
                    value={newPassword}
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

        {/* Editar infos */}
        <Dialog.Root open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <Dialog.Trigger asChild>
            <div className="edit-profile-button">
              <button>Editar perfil</button>
            </div>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title
                className="DialogTitle"
                style={{
                  display: "flex",
                  marginTop: 10,
                  justifyContent: "center",
                }}
              >
                Editar Perfil
              </Dialog.Title>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleEditProfile();
                }}
              >
                <div className="Fildset">
                  <InputField
                    id="editName"
                    label="Nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <InputField
                    id="editSurname"
                    label="Sobrenome"
                    type="text"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                  />

                  <InputField
                    id="editNif"
                    label="NIF"
                    type="text"
                    value={nif}
                    onChange={(e) => setNif(e.target.value)}
                  />

                  <InputField
                    id="editEmail"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputField
                    id="editPhone"
                    label="Telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 25,
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <button type="submit" className="Button cancel">
                    Salvar
                  </button>
                  <Dialog.Close asChild>
                    <button type="button" className="Button cancel">
                      Cancelar
                    </button>
                  </Dialog.Close>
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

      {/* =========== Mobile ============== */}
      <div className="Mobile">
        {user && (
          <div className="content-profile">
            <div className="nameProfile">
              <img src={User} alt="" />
              <p>
                {user.nome} {user.sobrenome}
              </p>
            </div>

            <div className="infoProfile">
              <div className="infoProfile-img">
                <img src={ProfileForma} alt="" />
              </div>
              <div className="infosProfile">
                <div className="nif">
                  <KeyRound className="nifIcon" />
                  <p className="textProfile">{user.nif}</p>
                </div>
                <div className="contatoProfile">
                  <h1>Informações de contato:</h1>

                  <div className="emailPersonal">
                    <Mail className="mailIcon" />
                    <p className="textProfile">{user.email}</p>
                  </div>

                  <div className="phone">
                    <Phone className="phoneIcon" />
                    <p className="textProfile">{user.telefone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="buttonsProfile">
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
          </div> */}
    </section>
  );
}
