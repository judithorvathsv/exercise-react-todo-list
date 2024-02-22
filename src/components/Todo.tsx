const Todo = ({ todoItem }: any) => {
  return (
    <article className="todo-item">
      <div className="content">
        <span className="text ${addedClass}">{todoItem.text}</span>
        <span className="shouldBeDoneTimeSpan notShow">{todoItem.shouldBeDoneBy}</span>
        <span hidden className="created ">
          ${todoItem.created}
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
