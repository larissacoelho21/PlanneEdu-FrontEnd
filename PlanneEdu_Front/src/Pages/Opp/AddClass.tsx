import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Pencil, UserMinus } from "lucide-react";
import { toast } from "sonner";

import { IntroForms } from "../../Components/IntroForms/IntroForms";
import { SubNavbar } from "../../Components/SubNavbar/SubNavbar";
import "../../Css/Opp/AddClass.css";
import { LargeButton } from "../../Components/Buttons/LargeButton/LargeButton";
import { SmallButton } from "../../Components/Buttons/SmallButton/SmallButton";
import { InputField } from "../../Components/Inputs/InputField/Field/InputField";
import ReactInputMask from "react-input-mask";
import { course } from "../../Services/Axios";

// Componente principal
export function AddClass() {
  // Tipos de dados
  interface Student {
    name: string;
    surname: string;
    registration: string;
  }

  interface Subject {
    name: string;
    teacher: string | null;
    workload: number;
  }

  // Estados
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      name: "Fundamentos de Programação Orientada a Objeto",
      teacher: null,
      workload: 75,
    },
    { name: "Sistemas Operacionais", teacher: null, workload: 75 },
    { name: "Hardware e Redes", teacher: null, workload: 75 },
    { name: "Linguagem de Marcação", teacher: null, workload: 75 },
  ]);

  const [showPopUpStudent, setShowPopUpStudent] = useState(false);
  const [showPopUpTeacher, setShowPopUpTeacher] = useState(false);
  const [nameStudent, setNameStudent] = useState("");
  const [surnameStudent, setSurnameStudent] = useState("");
  const [registrationStudent, setRegistrationStudent] = useState("");
  const [editStudentIndex, setEditStudentIndex] = useState<number | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<
    number | null
  >(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  // Funções de manipulação de estudante
  const togglePopUpStudent = () => {
    setShowPopUpStudent((prev) => !prev);
    setNameStudent("");
    setSurnameStudent("");
    setRegistrationStudent("");
    setEditStudentIndex(null);
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
    toast.success("Estudante adicionado com sucesso!");
    togglePopUpStudent();
  };

  const handleSaveStudent = () => {
    if (editStudentIndex === null) {
      addStudent();
    } else {
      editStudentHandler();
    }
  };

  const editStudentHandler = () => {
    if (editStudentIndex === null) return;

    const updatedStudents = [...students];
    updatedStudents[editStudentIndex] = {
      name: nameStudent,
      surname: surnameStudent,
      registration: registrationStudent,
    };

    setStudents(updatedStudents.sort((a, b) => a.name.localeCompare(b.name)));
    toast.success("Estudante editado com sucesso!");
    togglePopUpStudent();
  };

  const startEditStudent = (index: number) => {
    const studentToEdit = students[index];
    setEditStudentIndex(index);
    setNameStudent(studentToEdit.name);
    setSurnameStudent(studentToEdit.surname);
    setRegistrationStudent(studentToEdit.registration);
    setShowPopUpStudent(true);
  };

  const deleteStudent = (index: number) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
    toast.success("Estudante removido com sucesso!");
  };

  // Funções de manipulação de professor
  const togglePopUpTeacher = (index: number | null = null) => {
    setSelectedSubjectIndex(index);
    setSelectedTeacher(index !== null ? subjects[index].teacher : null);
    setShowPopUpTeacher((prev) => !prev);
  };

  const assignTeacher = () => {
    if (selectedSubjectIndex === null || !selectedTeacher) {
      toast.error("Selecione um professor para continuar!");
      return;
    }

    const updatedSubjects = [...subjects];
    updatedSubjects[selectedSubjectIndex].teacher = selectedTeacher;
    setSubjects(updatedSubjects);
    toast.success("Professor atribuído com sucesso!");
    togglePopUpTeacher();
  };

  // função back
  const [selectCourse, setSelectCourse] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [nameClass, setNameClass] = useState<string>("");
  const [shiftClass, setShiftClass] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectTeacher, setSelectTeacher] = useState<string>("");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const cursos = await course();
        console.log("Cursos recebidos da API:", cursos);

        setSelectCourse(cursos);
      } catch (error: any) {
        console.error("Erro ao carregar os cursos:", error.message);
        toast.error(error.message || "Não foi possível encontrar os cursos");
      }
    };

    getCourses();
  }, []);

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectCourse) {
      toast.error("Selecione um curso para continuar");
      return;
    }

    toast.success("Turma criada com sucesso!");
  };

  const convertToISO = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const validateDates = (startISO: string, endISO: string) => {
    const start = new Date(startISO);
    const end = new Date(endISO);

    if (end < start) {
      toast.error(
        "A data de entrega não pode ser menor que a data proposta! Tente novamente com uma data válida."
      );
      return false;
    } else {
      return true;
    }
  };

  const startDateISO = convertToISO(startDate);
  const endDateISO = convertToISO(endDate);

  if (!startDateISO || !endDateISO) {
    toast.error("Formato de data inválido! Use o formato DD/MM/AAAA.");
    return;
  }

  if (!validateDates(startDateISO, endDateISO)) {
    return;
  }

  return (
    <section className="add-new-class">
      <SubNavbar />

      <div className="title-addclass" style={{ marginBottom: "5%" }}>
        <IntroForms
          titleText="Adicione uma nova turma"
          subtitleText="Todos os campos são obrigatórios"
        />
      </div>

      <div className="select-planne-course">
        <label htmlFor="" className="label-select">
          Selecione um curso
        </label>
        <select
          id="select-course"
          value={selectedCourseId} 
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="input-all"
        >
          <option value=""></option>
          {selectCourse.map((curso) => (
            <option key={curso._id} value={curso._id}>
              {curso.planoCurso.nome}
            </option>
          ))}
        </select>
        <h2>* Obs: Para continuar você deve selecionar um curso</h2>
      </div>

      <form action="" onSubmit={handleSubmitCourse}>
        <div className="form-addclass">
          <InputField
            id="nameclass"
            label="Nome da turma"
            type="text"
            value={nameClass}
            onChange={(e) => setNameClass(e.target.value)}
            disabled={!selectCourse}
          />
          <div className="select-addclass">
            <label
              htmlFor=""
              className="label-add-class"
              style={{ color: "var(--black-two)", opacity: "90%" }}
            >
              Selecione o turno
            </label>
            <select name="" id="" disabled={!selectCourse}>
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
              <ReactInputMask
                className="input-all"
                type="text"
                mask="99/99/9999"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={!selectCourse}
              />
            </div>
            <div className="delivery-date">
              <label htmlFor="" className="label-date">
                Data de término
              </label>
              <ReactInputMask
                className="input-all"
                type="text"
                mask="99/99/9999"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={!selectCourse}
              />
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
                disabled={!selectCourse}
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
                    <SmallButton
                      text={
                        editStudentIndex === null
                          ? "Adicionar"
                          : "Salvar alterações"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleSaveStudent();
                      }}
                    />
                    <SmallButton text="Cancelar" onClick={togglePopUpStudent} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {students.length > 0 && (
            <div className="registrationStudent">
              <table className="table">
                <thead>
                  <tr className="title-info">
                    <th></th>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{`${student.name} ${student.surname}`}</td>
                      <td>{student.registration}</td>
                      <div className="buttons-action">
                        <td>
                          <button
                            onClick={() => startEditStudent(index)}
                            style={{ margin: "0 20% 0 28%" }}
                          >
                            <Pencil />
                          </button>
                          <button onClick={() => deleteStudent(index)}>
                            <UserMinus />
                          </button>
                        </td>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="timetableTeachers">
            <div className="title-timetable">
              <h1>Aulas, professores e cargas horárias</h1>
            </div>

            <div className="semester-grid">
              <h2 style={{ marginTop: "5%" }}>1° Semestre</h2>
              <table
                className="table-add-teacher"
                style={{ marginBottom: "5%" }}
              >
                <thead>
                  <tr>
                    <th>Matéria</th>
                    <th>Professor</th>
                    <th>Carga Horária</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.name}</td>
                      <td>
                        <SmallButton
                          text={subject.teacher || "Adicionar"}
                          onClick={() => togglePopUpTeacher(index)}
                          className="button-teacher"
                          disabled={!selectCourse}
                        />
                      </td>
                      <td>{subject.workload}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showPopUpTeacher && (
            <div
              className="overlay-add-student"
              onClick={() => togglePopUpTeacher(null)}
            >
              <div
                className="popup-add-student"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="popup-content-student">
                  <div className="texts-add-teacher">
                    <h1>Atribua um professor a essa matéria</h1>
                  </div>

                  <div className="select-teacher">
                    <label htmlFor="" className="label-select">
                      Selecione um professor
                    </label>
                    <select
                      value={selectedTeacher || ""}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Giovani">Giovani</option>
                      <option value="Arthur Rosa">Arthur Rosa</option>
                      <option value="Samuel">Samuel</option>
                    </select>
                  </div>

                  <div className="button-confirm">
                    <SmallButton
                      text="Confirmar"
                      onClick={(e) => {
                        e.preventDefault();
                        assignTeacher();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="save-class">
            <LargeButton text="Salvar informações" />
          </div>
        </div>
      </form>
    </section>
  );
}
