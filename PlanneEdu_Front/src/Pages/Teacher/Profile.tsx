/* Images */
import { KeyRound, Mail, Phone } from "lucide-react";
import Background from "../../assets/backgroundProfile.svg"

import { NavBarProfessor } from "../../Components/Docentes/NavBar-Professores/navBarProfessor";

import "../../Css/Teacher/Profile.css"
/* 'import { useState } from "react";' */
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import React, { useState } from 'react';

/* Interface para o InputField */
interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
}

function InputField({ id, label, type = "text" }: InputFieldProps) {
    const [isFilled, setIsFilled] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFilled(event.target.value !== "");
    };

    return (
        <fieldset className={`Fieldset ${isFilled ? 'filled' : ''}`}>
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


export function ProfileTeacher() {

    return (
        <section className="profileTeacher">
            
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
                        <div className="info-profile">
                            <div className="name">
                                <h3>
                                    Eduardo Ferreira Dias
                                </h3>
                            </div>

                            <div className="nif">
                                <KeyRound className="nifIcon" />
                                <p className="textProfile">15639479</p>
                            </div>

                            <div className="emailPersonal">
                                <Mail className="mailIcon" />
                                <p className="textProfile">eduardo.fdias@gmail.com</p>
                            </div>

                            <div className="phone">
                                <Phone className="phoneIcon" />
                                <p className="textProfile">11 9785-5975</p>
                            </div>

                            <div className="courses-profile">
                                <h3>Cursos atribuídos</h3>
                                <p>Logística</p>
                                <p>Administração</p>
                            </div>

                            <div className="classes-profile">
                                <h3>Turmas atribuídas</h3>
                                <p>Manhã 2024</p>
                                <p>Tarde 2024</p>
                                <p>Tarde 2023</p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div className="buttonsProfile">
                <div className="change-button">
                    <button>
                        Editar Informações
                    </button>
                </div>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <div className="password-button">
                            <button>
                                Trocar de senha
                            </button>
                        </div>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="DialogOverlay" />
                        <Dialog.Content className="DialogContent">
                            <Dialog.Title
                                className="DialogTitle"
                                style={{ display: "flex", marginTop: 10, justifyContent: "center" }}
                            >
                                Trocar senha
                            </Dialog.Title>
                            <div className="Fieldset">
                                <InputField id="actualpassword" label="Senha atual" type="password" />
                                <InputField id="newpassword" label="Nova senha" type="password" />
                                <InputField id="confirm" label="Confirmar nova senha" type="password" />
                            </div>
                            <div
                                style={{ display: "flex", marginTop: 25, justifyContent: "center" }}
                            >
                                <Dialog.Close asChild>
                                    <button className="Button save">Salvar</button>
                                </Dialog.Close>
                            </div>
                            <Dialog.Close asChild>
                                <div aria-label="Close">
                                    <Cross2Icon className="IconButton"/>
                                </div>
                            </Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

            </div>
        </section>
    )
}
