import { Clock3, Users } from "lucide-react";
import "../InfoClass/InfoClass.css";

interface InfoClassProps {
  course: string;
  classCard: string;
  dateI: string;
  dateT: string;
  semester: number;
  students: string;
  yearClass: string;
}

export function InfoClass({
  course,
  classCard,
  dateI,
  dateT,
  semester,
  students,
  yearClass,
}: InfoClassProps) {
  return (
    <div className="box-info-class">
      <h1>
        {course} | {classCard} {yearClass}
      </h1>
      <div className="date-badge">
        <span>
          {dateI} — {dateT}
        </span>
      </div>
      <div className="infos-teacher">
        <div className="semester-teacher">
          <Clock3 size={18} />
          <h1>{semester} semestres</h1>
        </div>
        <div className="students">
          <Users size={18} />
          <h1>{students} alunos</h1>
        </div>
      </div>
    </div>
  );
}
