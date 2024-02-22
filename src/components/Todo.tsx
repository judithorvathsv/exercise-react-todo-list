import { useState } from "react";

const Todo = ({ todoItem, onHandleTodoItem }: { todoItem: any; onHandleTodoItem(e: any): void }) => {
  const [text, setText] = useState("");
  /* //************
   **************
   *********** / */

  //--------------EDIT TODO TEXT function-------------------------
  function editTodoText(clickedButtonSpan: any) {
    const inputChild = document.createElement("input");
    let parent = clickedButtonSpan.parentElement.parentElement.children[0];
    let textField = clickedButtonSpan.parentElement.parentElement.children[0].children[0];

    if (clickedButtonSpan.innerText == "edit") {
      parent.replaceChild(inputChild, textField);
      clickedButtonSpan.innerText = "bookmark_added";
      console.log(inputChild);
      setText(inputChild.value);
    } else {
      if (parent.firstElementChild.value.length > 0) {
        const spanChild = document.createElement("span");
        parent.appendChild(spanChild);
        console.log(text);
        spanChild.innerText = text;
        spanChild.classList.add("text");
        parent.replaceChild(spanChild, parent.firstElementChild);
        clickedButtonSpan.innerText = "edit";
        const createdAt = parent.children[2].innerText;
        console.log();

        /*         allTodos.map((t) => {
          if (t.created == createdAt) {
            t.text = text.value;
          }
        }); */
      }
    }
    console.log(text);
  }

  function handleClickedButtonAction(e: any) {
    if (e.target.classList.contains("editButton")) {
      editTodoText(e.target);
    } else {
      onHandleTodoItem(e);
    }
  }

  return (
    <article
      className="todo-item"
      onClick={(e) => {
        handleClickedButtonAction(e);
      }}
    >
      <div className="content">
        <span className="text">{todoItem.text}</span>
        <div>
          <span className="shouldBeDoneTimeSpan">Due date: {todoItem.shouldBeDoneBy}</span>
        </div>
        <span hidden className="created ">
          ${todoItem.created}
        </span>
        <span hidden className="id">
          {todoItem.id}
        </span>
      </div>
      <div className="action-icons">
        <span className="material-symbols-outlined upButton">arrow_upward</span>
        <span className="material-symbols-outlined downButton">arrow_downward</span>
        <span className="material-symbols-outlined deleteButton">delete</span>
        <span className="material-symbols-outlined doneButton">done</span>
        <span className="material-symbols-outlined editButton">edit</span>
      </div>
    </article>
  );
};

export default Todo;
