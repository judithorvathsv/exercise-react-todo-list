import { useState } from "react";

const Todo = ({ todoItem, onHandleTodoItem }: { todoItem: any; onHandleTodoItem(e: any): void }) => {
  function handleClickedButtonAction(e: any) {
    onHandleTodoItem(e);
    /*     if (e.target.classList.contains("editButton")) {
      editTodoText(e.target);
    } else {
      onHandleTodoItem(e);
    } */
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
