import { useState } from "react";
/* import AuthorDropDown from "./AuthorDropDown"; */

/*
type AllAuthorsProp = [{ name: string; id: number }];
let count: number = 1;

//add 'All' as author to have a default user
let allAuthorsArray: AllAuthorsProp = [{ name: "All user", id: 0 }];

//get authors from localstorage into allAuthorsArray
let authorsStorage = localStorage.getItem("authorsStorage");
let authorsSavedInStorage: AllAuthorsProp;
if (authorsStorage !== null && authorsStorage.length > 0) {
  authorsSavedInStorage = JSON.parse(authorsStorage);
  for (let a = 0; a < authorsSavedInStorage.length; a++) {
    allAuthorsArray.push(authorsSavedInStorage[a]);
  }
} else {
  localStorage.setItem("authorsStorage", JSON.stringify(allAuthorsArray));
}
//-------------------------------------------------------------------------------------------
const Author = () => {
  const [allAuthors, setAllAuthors] = useState(allAuthorsArray);
  const [author, setAuthor] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    setAuthor(e.target.value);
    //set new author
    let newAuthor = {
      name: author,
      id: count++,
    };

    //if author is not already added then add to all authors array
    if (author == "" || allAuthorsArray.filter((authorInArray) => authorInArray.name == author).length <= 0) {
      allAuthorsArray.push(newAuthor);
    }

    //setAllAuthor
    setAllAuthors(allAuthorsArray);

    //set localstorage
    localStorage.setItem("authorsStorage", JSON.stringify(allAuthors));
  }

  return (
    <>
      <section id="saveAuthorSection">
        <label htmlFor="authorInput">Save a new user:</label>
        <form id="authorInputForm" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" id="authorInput" required value={author} onChange={(e) => setAuthor(e.target.value)} />
          <button type="submit" id="submitAuthorButton">
            Save
          </button>
        </form>
      </section>
      <AuthorDropDown allAuthors={allAuthors} />
    </>
  );
};

export default Author;
*/


//-------------------------------------------------------------------------------------------
type NewAuthorProps = {
  onAddAuthor: (author: string) => void;
};

const NewAuthor = ({ onAddAuthor }: NewAuthorProps) => {
  const [author, setAuthor] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    setAuthor(e.target.value);
    onAddAuthor(author);
  }

  return (
    <>
      <section id="saveAuthorSection">
        <label htmlFor="authorInput">Save a new user:</label>
        <form id="authorInputForm" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" id="authorInput" required value={author} onChange={(e) => setAuthor(e.target.value)} />
          <button type="submit" id="submitAuthorButton">
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default NewAuthor;
