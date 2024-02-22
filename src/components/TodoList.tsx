import { TodoProps } from "../App";
import Todo from "./Todo";

type AllTodoProps = {
  allTodos: TodoProps[];
};

const TodoList = ({ allTodos }: AllTodoProps) => {
  return (
    <section id="todoSection" className="todo-list">
      {allTodos.map((todoItem) => (
        <Todo todoItem={todoItem} key={todoItem.id} />
      ))}
    </section>
  );
};

export default TodoList;
