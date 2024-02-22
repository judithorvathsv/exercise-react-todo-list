import { AuthorProps } from "../App";

type AllAuthorProps = {
  allAuthors: AuthorProps[];
  onGetSelectedOption: (selectedOption: string) => string;
};
const AuthorDropDown = ({ allAuthors, onGetSelectedOption }: AllAuthorProps) => {
  function handleSelectedOption(e: string): void {  
    onGetSelectedOption(e);
  }

  return (
    <section>
      <label>Choose a user:</label>
      <select name="user-names" id="userNames" onChange={(e) => handleSelectedOption(e.target.value)}>
        {allAuthors.map((author: any) => (
          <option key={author.id} value={author.authorName}>
            {author.authorName}
          </option>
        ))}
      </select>
    </section>
  );
};

export default AuthorDropDown;
