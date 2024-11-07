import "../TableSubjects/TableSubjects.css";

interface TableProps {
  semesterTable: number;
  subjectTable: string;
  workloadTable: number;
  subjectTable2: string;
  workloadTable2: number;
}

export function TableSubjects({
  semesterTable,
  subjectTable,
  workloadTable,
  subjectTable2,
  workloadTable2
}: TableProps) {
  return (
    <div className="subjects-and-hourr">
      <div className="table-grid-hours">
        <div className="forms-grid-hours">
          <div className="semester-grid">
            <h2 style={{ marginBottom: "2%" }}>{semesterTable}° Semestre</h2>
            <table className="table-infos-grid">
              <thead>
                <tr>
                  <th>Matéria</th>
                  <th>Carga Horária</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{subjectTable}</td>
                  <td>{workloadTable}</td>
                </tr>
                <tr>
                  <td>{subjectTable2}</td>
                  <td>{workloadTable2}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
