import NewAuthor from "./components/NewAuthor";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import AuthorDropDown from "./components/AuthorDropDown";
import { useState } from "react";

export type AuthorProp = {
  authorName: string;
  id: number;
};

let count: number = 1;

export function App() { 
  const [allAuthors, setAllAuthors] = useState<AuthorProp[]>([{ authorName: "All user", id: 0 }]);

  function handleAddAuthor(author: string) {
    setAllAuthors((prevAuthors) => {
      const newAuthor: AuthorProp = {
        authorName: author,
        id: count++,
      };
      return [...prevAuthors, newAuthor];
    });
  }

  return (
    <>
      <header>
        <h1>Todo List</h1>
      </header>
      <main>
        <NewAuthor onAddAuthor={handleAddAuthor} />
        <AuthorDropDown allAuthors={allAuthors} />
        <NewTodo />
        <TodoList />
      </main>
    </>
  );
}

/*
1 view all my todos in the same place
2 add new todos to my todo list 
3 mark a todo as completed 
4 remove a todo from the list 
5 move todos up and down in order to prioritize what I have to do.
6 edit existing todos 
7 timestamp to be added to my new todos in order better se how old all the todos are.
8 sort my todos after either timestamp or author.
*/
