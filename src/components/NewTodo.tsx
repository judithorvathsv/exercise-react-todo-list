import { TodoProps } from "../App";

type NewTodoProps = {
  onAddTodo: (todo: TodoProps) => void;
};

const NewTodo = ({ onAddTodo }: NewTodoProps) => {
  //---------------------------------------------------
  function handleSubmit(e: any) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
      timeInput: { value: string };
    };

    const text = target.text.value;
    const timeInput = target.timeInput.value.replace("T", " ");
    const createdDateTime = new Date().toString();

    let newtodo = {
      author: "SelectedUser",
      text: text,
      done: false,
      shouldBeDoneBy: timeInput,
      created: createdDateTime,
      id: 0,
    };

    onAddTodo(newtodo);
  }
  //-------------------------------------------------
  return (
    <>
      <section>
        <label htmlFor="userNames">Add a new todo to chosen user</label>
        <form id="todoInputForm" onSubmit={(e) => handleSubmit(e)}>
          <label className="todoInputLabel" htmlFor="todoInput">
            Todo:
          </label>
          <input type="text" name="text" id="todoInput" />
          <label className="todoInputLabel" htmlFor="timeInput">
            Due date:
          </label>
          <input type="datetime-local" name="timeInput" id="timeInput" />
          <button type="submit" id="submitButton">
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default NewTodo;
