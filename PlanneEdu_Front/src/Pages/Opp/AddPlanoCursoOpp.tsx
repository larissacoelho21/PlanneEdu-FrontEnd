import { AddMateria } from "../../Components/PlanoDeCurso/AddMateria";
import { Competencias } from "../../Components/PlanoDeCurso/Competencias";

export function AddPlanoCurso() {
   return (
    <section className="AddPlanCourses">
      <div className="AddInfo">
        <form>
          <div className="inputs-opp">
            <input type="text" placeholder="Nome do Curso" />
            <input type="text" placeholder="Categoria" />
            <input type="text" placeholder="Objetivo" />
            <input type="text" placeholder="Competências Profissionais" />
            <input type="text" placeholder="Carga horária" />
            <input type="text" placeholder="Qtd de semestres" />
            <input type="text" placeholder="Tempo de curso" />
          </div>

          <div className="grade-horaria">
            <AddMateria />
          </div>

          <div className="ementa">
            <p>Ementa</p>
            <input type="text" placeholder="Unidade curricular" />
            <input type="text" placeholder="Objetivo" />
          </div>

          <div className="competencias">
            <Competencias />
          </div>

          <div className="Conhecimentos">
            <p>Conhecimentos</p>
            <input type="text" placeholder="Tópicos" />
            <button>+</button>
            <input type="text" placeholder="Sub tópico" />
            <button>+</button>
            <input type="text" placeholder="Detalhe" />
            <button>+</button>
            <input type="text" placeholder="Ambiente pedagógico" />
          </div>

          <div className="botao">
            <button>✓ Salvar Informações</button>
          </div>
        </form>
      </div>
    </section>
  );
}
