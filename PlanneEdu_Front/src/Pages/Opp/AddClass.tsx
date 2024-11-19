import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IntroForms } from "../../Components/IntroForms/IntroForms";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddClass.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "sonner";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  const [isFilled, setIsFilled] = useState(!!value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFilled(event.target.value !== "");
    if (onChange) onChange(event); 
  };

  return (
    <fieldset className={`Fieldset ${isFilled ? "filled" : ""}`}>
      <label className="label-add" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-add"
        id={id}
        type={type}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </fieldset>
  );
}

export function AddClass() {

  // TODO criando função de criar estudante e add ele na tabela

  // add estudante
  interface Student {
    name: string;
    surname: string;
    registration: string;
  }

  const [showPopUpStudent, setShowPopUpStudent] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [nameStudent, setNameStudent] = useState("");
  const [surnameStudent, setSurnameStudent] = useState("");
  const [registrationStudent, setRegistrationStudent] = useState("");

  const togglePopUpStudent = () => {
    setShowPopUpStudent(!showPopUpStudent);

    if (showPopUpStudent) {
      setNameStudent("");
      setSurnameStudent("");
      setRegistrationStudent("");
    }
  };

  const addStudent = () => {
    if (!nameStudent || !surnameStudent || !registrationStudent) {
      toast.error("Preencha todos os campos para continuar!");
      return;
    }

    const newStudent: Student = {
      name: nameStudent,
      surname: surnameStudent,
      registration: registrationStudent,
    };

    const updatedStudents = [...students, newStudent].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setStudents(updatedStudents);

    togglePopUpStudent();
    toast.success("Estudante adicionado com sucesso!");
  };

    // add estudante

  return (
    <section className="add-new-class">
      <SubNavbar />

      <div className="title-addclass" style={{ marginBottom: "5%" }}>
        <IntroForms
          titleText="Adicione uma nova turma"
          subtitleText="Todos os campos são obrigatórios"
        />
      </div>

      <form action="">
        <div className="form-addclass">
          <div className="select-addclass">
            <label htmlFor="" className="label-select">
              Selecione o curso
            </label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
          <div className="input-addclass">
            <InputField id="nameclass" label="Nome da turma" type="text" />
          </div>
          <div className="select-addclass">
            <label htmlFor="" className="label-select">
              Selecione o turno
            </label>
            <select name="" id="">
              <option value=""></option>
              <option value="">Matutino</option>
              <option value="">Vespertino</option>
              <option value="">Noturno</option>
              <option value="">Integral</option>
            </select>
          </div>
          <div className="dates-add">
            <div className="proposed-date">
              <label htmlFor="" className="label-date">
                Data de início
              </label>
              <input type="date" name="dataInicio" />
            </div>
            <div className="delivery-date">
              <label htmlFor="" className="label-date">
                Data de término
              </label>
              <input type="date" name="dataTermino" />
            </div>
          </div>

          <div className="list-students">
            <div className="title-add-student">
              <h1>Lista de alunos</h1>
            </div>
            <div className="add-student">
              <h1>Clique para adicionar</h1>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  togglePopUpStudent();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          {showPopUpStudent && (
            <div className="overlay-add-student" onClick={togglePopUpStudent}>
              <div
                className="popup-add-student"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="popup-content-student">
                  <div className="texts-student">
                    <h1>Adicione um aluno a esta turma</h1>
                  </div>
                </div>

                <div className="forms-add-student">
                  <div className="name-student">
                    <InputField
                      id="nameStudent"
                      label="Nome do aluno"
                      type="text"
                      value={nameStudent}
                      onChange={(e) => setNameStudent(e.target.value)}
                    />
                  </div>
                  <div className="surname-student">
                    <InputField
                      id="surnameStudent"
                      label="Sobrenomes"
                      type="text"
                      value={surnameStudent}
                      onChange={(e) => setSurnameStudent(e.target.value)}
                    />
                  </div>
                  <div className="registration-student">
                    <InputField
                      id="rmStudent"
                      label="RM"
                      type="text"
                      value={registrationStudent}
                      onChange={(e) => setRegistrationStudent(e.target.value)}
                    />
                  </div>

                  <div className="button-student">
                    <button onClick={addStudent}>Adicionar</button>
                    <button onClick={togglePopUpStudent}>Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {students.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Matrícula</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${student.name} ${student.surname}`}</td>
                    <td>{student.registration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </form>

      
    </section>
  );
}