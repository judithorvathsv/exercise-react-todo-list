import { TodoProps } from "../App";

type NewTodoProps = {
  onAddTodo: (todo: TodoProps) => void;
};

const NewTodo = ({ onAddTodo }: NewTodoProps) => {
  function getCorrectDateTimeFormat(dateTimeData: Date): string {
    //MONTH AND DATE IS NOT OK !!!!!!
    let dateTimeDataInCorrectForm = `${dateTimeData.getFullYear()}-${dateTimeData.getUTCMonth()}-${dateTimeData.getUTCDay()} ${dateTimeData.getHours()}:${dateTimeData.getMinutes()}`;
    return dateTimeDataInCorrectForm;
  }

  //---------------------------------------------------
  function handleSubmit(e: any) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
      timeInput: { value: string };
    };

    const text = target.text.value;
    const timeInput = target.timeInput.value.replace("T", " ");
    const dateTimeNow = new Date();
    //console.log(dateTimeNow, "dateTimeNow");
    const createdDateTime = getCorrectDateTimeFormat(dateTimeNow);
    //console.log(createdDateTime, "createdDateTime");

    let newtodo = {
      author: "Judit",
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
