import { BookMarked, GraduationCap, Settings } from "lucide-react";
import "../BoxPlan/BoxPlan.css";
import { ReactNode } from "react";

interface CardPlanProps {
  matter: string;
  course: string;
  iconTeacher: ReactNode;
  teacher: string;
  iconClass: ReactNode;
  shiftCourse: string;
  yearCourse: string;
}

export function CardPlan({
  matter,
  course,
  iconTeacher,
  teacher,
  iconClass,
shiftCourse,
yearCourse
}: CardPlanProps) {
  return (

    <div className="box-plans">
      <h1>
        {matter}
      </h1>

      <div className="tag-course">
        <span>
          {course}
        </span>
      </div>

      <div className="infos-class">
        <div className="teacher-plan">
          {iconTeacher}
          <h1>{teacher}</h1>
        </div>
        <div className="shift-class">
          {iconClass}
          <h1>{shiftCourse} {yearCourse}</h1>
        </div>
      </div>
    </div>
  )
}
