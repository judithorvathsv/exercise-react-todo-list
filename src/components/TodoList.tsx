import { useCallback, useState } from "react";
import { TodoProps } from "../App";
import Todo from "./Todo";

type AllTodoProps = {
  allTodos: TodoProps[];
};

const TodoList = ({ allTodos, onRefreshTodoList }: { allTodos: TodoProps[]; onRefreshTodoList(allTodos: TodoProps[]): void }) => {
  //----------------------------------------------------
  function reWriteTodoList(allTodos: TodoProps[]) {
    onRefreshTodoList(allTodos);
  }

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

  //--------------MOVE UP function-------------------------
  function moveUpTodoItem(textSpan: any) {
    allTodos.map((t) => {
      if (t.text == textSpan.innerText) {
        let index = allTodos.indexOf(t);
        if (index > 0) {
          let beforeItem = allTodos[index - 1];
          let thisItem = allTodos[index];
          allTodos[index] = beforeItem;
          allTodos[index - 1] = thisItem;
          console.log(allTodos, "moveTodos");
          reWriteTodoList(allTodos);
        }
      }
    });
  }

  //--------------MOVE DOWN function-------------------------
  function swap(arr: any, from: number, to: number) {
    arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
  }
  function moveDownTodoItem(textSpan: any) {
    let index = -1;
    allTodos.map((t) => {
      if (t.text == textSpan.innerText) {
        index = allTodos.indexOf(t);
      }
    });
    if (index < allTodos.length - 1) {
      swap(allTodos, index, index + 1);
      reWriteTodoList(allTodos);
    }
  }

  function handleTodoItem(e: any): void {
    let textSpan = e.target.parentElement.parentElement.children[0].children[0];
    if (e.target.classList.contains("doneButton")) {
      checkOrUncheckTodoAsDone(textSpan);
    } else if (e.target.classList.contains("deleteButton")) {
      deleteTodo(textSpan);
    } else if (e.target.classList.contains("upButton")) {
      moveUpTodoItem(textSpan);
    } else if (e.target.classList.contains("downButton")) {
      moveDownTodoItem(textSpan);
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
