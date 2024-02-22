/* const AuthorDropDown = ({ allAuthors }: any) => {
  return (
    <section>
      <label>Choose a user:</label>
      <select name="user-names" id="userNames">
        {allAuthors.map((author: any) => (
          <option key={author.id} value={author.name}>
            {author.name}
          </option>
        ))}
      </select>
    </section>
  );
};

export default AuthorDropDown; */

const AuthorDropDown = ({ allAuthors }: any) => {
  return (
    <section>
      <label>Choose a user:</label>
      <select name="user-names" id="userNames">
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
