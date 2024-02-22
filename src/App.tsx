import NewAuthor from "./components/NewAuthor";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import AuthorDropDown from "./components/AuthorDropDown";
import { useState } from "react";

export type AuthorProps = {
  authorName: string;
  id: number;
};

export type TodoProps = {
  author: string;
  text: string;
  done: boolean;
  shouldBeDoneBy: string;
  created: string;
  id: number;
};

let count: number = 1;

export function App() {
  const [allAuthors, setAllAuthors] = useState<AuthorProps[]>([{ authorName: "All user", id: 0 }]);
  const [allTodos, setAllTodos] = useState<TodoProps[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  function handleAddAuthor(author: string) {
    setAllAuthors((prevAuthors) => {
      const newAuthor: AuthorProps = {
        authorName: author,
        id: count++,
      };
      return [...prevAuthors, newAuthor];
    });
  }

  function handleAddTodo(todo: TodoProps) {
    setAllTodos((prevTodos) => {
      const newTodo: TodoProps = {
        author: selectedOption == "" ? "All user" : selectedOption,
        text: todo.text,
        done: todo.done,
        shouldBeDoneBy: todo.shouldBeDoneBy,
        created: todo.created,
        id: allTodos.length,
      };
      return [...prevTodos, newTodo];
    });
  }

  let handleSelectedAuthorOption = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    return selectedOption;
  };

  console.log(allTodos,'in app');

  return (
    <>
      <header>
        <h1>Todo List</h1>
      </header>
      <main>
        <NewAuthor onAddAuthor={handleAddAuthor} />
        <AuthorDropDown allAuthors={allAuthors} onGetSelectedOption={(selectedOption) => handleSelectedAuthorOption(selectedOption)} />
        <NewTodo onAddTodo={handleAddTodo} />
        <TodoList allTodos={allTodos} />
      </main>
    </>
  );
}

/*
1 view all my todos in the same place
2 add new todos to my todo list -- OK
3 mark a todo as completed 
4 remove a todo from the list 
5 move todos up and down in order to prioritize what I have to do.
6 edit existing todos 
7 timestamp to be added to my new todos in order better se how old all the todos are.
8 sort my todos after either timestamp or author. 
*/
