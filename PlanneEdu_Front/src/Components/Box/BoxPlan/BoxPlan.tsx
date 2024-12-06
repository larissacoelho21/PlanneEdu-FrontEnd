import { BookMarked, GraduationCap, Settings } from "lucide-react";
import { ReactNode } from "react";
import "../../../Css/Teacher/PlanEnsino.css"

interface CardPlanProps {
  matter: string;
  course: string;
  iconTeacher: ReactNode;
  teacher: string;
  iconClass: ReactNode;
  shiftCourse: string;
}

export function CardPlan({
  matter,
  course,
  iconTeacher,
  teacher,
  iconClass,
  shiftCourse,
}: CardPlanProps) {
  return (
    <section className="cards-plans-teaching">
    <div className="card-plan-teaching">
      <div className="title-card-plan">
        <h1>{matter}</h1>

        <div className="course-badge">
          <span>{course}</span>
        </div>

        <div className="infos-box">
          <div className="semester">
            {iconTeacher}
            <h1>{teacher}</h1>
          </div>
          <div className="student-class">
            {iconClass}
            <h1>{shiftCourse}</h1>
          </div>
        </div>
      </div>
    </div>
    </section> 
  );
}
