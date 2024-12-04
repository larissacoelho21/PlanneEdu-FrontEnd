import { Clock3, Users } from "lucide-react";
import "../BoxTeacher/BoxTeacher.css";

interface CardTeacherProps {
  course?: string;
  classCard: string;
  detail?: string;
  textI?: string;
  textT?: string;
  dateI: string;
  dateT: string;
  semester: number;
  students: string;
  yearClass: string;
}

export function CardTeacher({
  course,
  classCard,
  detail,
  textI,
  textT,
  dateI,
  dateT,
  semester,
  students,
  yearClass,
}: CardTeacherProps) {
  return (
    <div className="box-teacher">
      <h1>
        {course} {detail} {classCard} {yearClass}
      </h1>
      <div className="date-badge">
        <span>
          {textI} {dateI} {detail} {textT} {dateT}
        </span>
      </div>
      <div className="infos-class">
        <div className="semester-teacher">
          <Clock3 size={18} />
          <h1>{semester} semestres</h1>
        </div>
        <div className="student">
          <Users size={18} />
          <h1>{students} alunos</h1>
        </div>
      </div>
    </div>
  );
}
