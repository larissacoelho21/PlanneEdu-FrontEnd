import { useState } from "react";
import { BaseUrl } from "../../Config/config";
import { toast } from "sonner";

export function AddUser() {
  /* Função Back-End */

  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [area, setArea] = useState("");
  const [nif, setNif] = useState("");
  const [password, setPassword] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Recupera o token do localStorage
  const token = localStorage.getItem("Authorization");


  console.log("#################")
  console.log(token)
  console.log("#################")

  console.log({
    name,
    sobrenome,
    area,
    nif,
    password,
    nivelAcesso,
    email,
    telefone,
  });

  const AddUser = async (event: React.FormEvent) => {
    event.preventDefault();

    await fetch(`${BaseUrl}/register`, {
      //conectando com o computador que está rodando o back-end
      method: "POST", //method post de envio
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
      },
      body: JSON.stringify({
        name: name,
        sobrenome: sobrenome,
        area: area,
        nif: nif,
        password: password,
        nivelAcesso: nivelAcesso,
        email: email,
        telefone: telefone,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message || "Erro desconhecido");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("sucesso", data);
        toast.success("Novo Usuário criado com sucesso!");
      })
      .catch((error) => {
        toast.error(`Erro: ${error.message}`); //alert
        console.error(error.message);
      });
  };

  return (
    <section className="AddUsuario">
      <div className="cardUser">
        <form onSubmit={AddUser}>
          <div className="infoUser">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(event) => setSobrenome(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Área de atuação"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
            <input
              type="number"
              placeholder="NIF"
              value={nif}
              onChange={(event) => setNif(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Senha - 8 dígitos"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <div className="nivelPermissao">
              <label>Nível Permissão</label>
              <select
                id="nivelAcesso"
                value={nivelAcesso}
                onChange={(event) => setNivelAcesso(event.target.value)}
              >
                <option value="">Selecione</option>
                <option value="opp">Opp</option>
                <option value="docente">Docente</option>
              </select>
            </div>
          </div>
          <div className="Contact">
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              required
            />
          </div>

          <div className="salve">
            <button type="submit">✓ Salvar Alterações</button>
          </div>
        </form>
      </div>
    </section>
  );
}
