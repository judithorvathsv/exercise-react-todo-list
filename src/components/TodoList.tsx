import { useState } from "react";
import { TodoProps } from "../App";
import Todo from "./Todo";

type AllTodoProps = {
  allTodos: TodoProps[];
  onRefreshTodoList(allTodos: TodoProps[]): void;
  selectedOption: string;
};

const TodoList = ({ allTodos, onRefreshTodoList, selectedOption }: AllTodoProps) => {
  const [text, setText] = useState("");
  //---------------refresh html -----------------------
  function reWriteTodoList(allTodos: TodoProps[]) {
    onRefreshTodoList(allTodos);
  }

  //--------------FILTER TODOLIST BY AUTHOR function-------------------------
  function getFilteredTodoByAuthor() {
    if (selectedOption == null || selectedOption == "") {
      selectedOption = "All user";
    }
    if (selectedOption !== "All user") {
      return allTodos.filter((todo) => todo.author == selectedOption);
    } else {
      return allTodos;
    }
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

  //--------------SORT TODO function-------------------------
  function sortTodosByDueDate(e: any) {
    let buttonLabel = e.target.innerText;
    let allTodoFilteredByAuthor = getFilteredTodoByAuthor();
    if (buttonLabel == "Sort todo by due date") {
      e.target.innerText = "Show original list";
      allTodoFilteredByAuthor.sort(function (a: any, b: any): any {
        let aDate: any = new Date(a.shouldBeDoneBy);
        let bDate: any = new Date(b.shouldBeDoneBy);
        return aDate - bDate;
      });
      reWriteTodoList(allTodoFilteredByAuthor);
    } else {
      allTodoFilteredByAuthor.sort(function (a: any, b: any): any {
        let aCreatedDate: any = new Date(a.created);
        let bCreatedDate: any = new Date(b.created);
        return aCreatedDate - bCreatedDate;
      });
      e.target.innerText = "Sort todo by due date";
      reWriteTodoList(allTodoFilteredByAuthor);
    }
  }

  //--------------EDIT TODO function-------------------------
  function editTodoItem(textSpan: any) {
    let buttonSpan = textSpan.parentElement.parentElement.children[1].children[4];
    const inputFIeldChild = document.createElement("input");
    inputFIeldChild.setAttribute("id", "inputChild");
    inputFIeldChild.setAttribute("type", "text");
    let parent = buttonSpan.parentElement.parentElement.children[0];
    let originalTextField = buttonSpan.parentElement.parentElement.children[0].children[0];
    let originalTodoText = originalTextField.innerText;

    //if click on edit button
    if (buttonSpan.innerText == "edit") {
      //get input field with original info from todo
      parent.replaceChild(inputFIeldChild, originalTextField);
      inputFIeldChild.setAttribute("value", originalTodoText);
      //change button text
      buttonSpan.innerText = "bookmark_added";
    } else {
      //get info from input field
      const input = document.getElementById("inputChild") as HTMLInputElement | null;
      if (input?.value !== "") {
        setText(input == null ? originalTodoText : input.value);
        //set span back with info from input field
        const spanChild = document.createElement("span");
        parent.appendChild(spanChild);
        spanChild.innerText = input == null ? originalTodoText : input.value;
        spanChild.classList.add("text");
        parent.replaceChild(spanChild, parent.firstElementChild);
        //change button text back to origin
        buttonSpan.innerText = "edit";
        const createdAt = parent.children[2].innerText;
        allTodos.map((t) => {
          console.log(t.created + "list date");
          if (t.created.toString() == createdAt.toString().substring(1)) {
            t.text = input == null ? originalTodoText : input.value;
          }
        });
      }
    }
  }

  console.log(allTodos, "bent");

  //--------------MAIN function-------------------------
  function handleTodoItem(e: any): void {
    getFilteredTodoByAuthor();
    let textSpan = e.target.parentElement.parentElement.children[0].children[0];
    if (e.target.classList.contains("doneButton")) {
      checkOrUncheckTodoAsDone(textSpan);
    } else if (e.target.classList.contains("deleteButton")) {
      deleteTodo(textSpan);
    } else if (e.target.classList.contains("upButton")) {
      moveUpTodoItem(textSpan);
    } else if (e.target.classList.contains("downButton")) {
      moveDownTodoItem(textSpan);
    } else if (e.target.classList.contains("editButton")) {
      editTodoItem(textSpan);
    }
  }

  return (
    <section id="todoSection" className="todo-list">
      <button id="sortTodoByTime" onClick={(e) => sortTodosByDueDate(e)}>
        Sort by due date
      </button>
      <hr />
      {getFilteredTodoByAuthor().map((todoItem) => (
        <Todo todoItem={todoItem} key={todoItem.id} onHandleTodoItem={(e) => handleTodoItem(e)} />
      ))}
    </section>
  );
};

export default TodoList;
