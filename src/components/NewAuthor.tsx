import { useState } from "react";

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

