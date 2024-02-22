import { TodoProps } from "../App";
import Todo from "./Todo";

type AllTodoProps = {
  allTodos: TodoProps[];
};

const TodoList = ({ allTodos }: AllTodoProps) => {
  //--------------DONE function-------------------------
  function checkOrUncheckTodoAsDone(textSpan: any) {
    if (textSpan.classList.contains("lineThrough")) {
      textSpan.classList.remove("lineThrough");
      allTodos.map((t) => {
        if (t.text == textSpan.innerText) {
          let index = allTodos.indexOf(t);
          if (index >= 0) {
            t.done = false;
          }
        }
      });
    } else {
      textSpan.classList.add("lineThrough");
      allTodos.map((t) => {
        if (t.text == textSpan.innerText) {
          let index = allTodos.indexOf(t);
          if (index >= 0) {
            t.done = true;
          }
        }
      });
    }
  }

  //--------------DELETE function-------------------------
  function deleteTodo(textSpan: any) {
    //remove todo from allTodo array
    allTodos.map((t) => {
      if (t.text == textSpan.innerText) {
        let index = allTodos.indexOf(t);
        if (index > -1) {
          allTodos.splice(index, 1);
        }
      }
    });

    //remove todo from Html
    let grandParentElementInHtml = textSpan.parentElement.parentElement;
    console.log(textSpan.parentElement.parentElement);
    grandParentElementInHtml.parentNode.removeChild(grandParentElementInHtml);
  }

  function handleTodoItem(e: any): void {
    if (e.target.classList.contains("doneButton")) {
      let textSpan = e.target.parentElement.parentElement.children[0].children[0];
      checkOrUncheckTodoAsDone(textSpan);
    } else if (e.target.classList.contains("deleteButton")) {
      let textSpan = e.target.parentElement.parentElement.children[0].children[0];
      deleteTodo(textSpan);
    }
    console.log(allTodos, "in todo");
  }

  return (
    <section id="todoSection" className="todo-list">
      {allTodos.map((todoItem) => (
        <Todo todoItem={todoItem} key={todoItem.id} onHandleTodoItem={(e) => handleTodoItem(e)} />
      ))}
    </section>
  );
};

export default TodoList;
