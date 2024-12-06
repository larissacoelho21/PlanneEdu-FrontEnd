import { Clock3, Users } from "lucide-react";
import "../BoxTeacher/BoxTeacher.css";

interface CardTeacherProps {
  course: string;
  detail: string;
  classCard: string;
  dateI: string;
  dateT: string;
  semester: number;
  students: number;
}

const CardTeacher: React.FC<CardTeacherProps> = ({
  course,
  detail,
  classCard,
  dateI,
  dateT,
  semester,
  students,
}) => {
  return (
    <div className="card-box">
      <div className="date-badge">
        <h1>{classCard}</h1>
      </div>

      <div className="box-teacher">
        <h1 style={{ marginBottom: "3%" }}>{course}</h1>
        <div className="infos-box">
          <div className="semester">
            <Clock3 size={18} />
            <h1>{semester} semestres</h1>
          </div>
          <div className="student-class">
            <Users size={18} />
            <h1>{students} alunos</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTeacher;
