import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, isError, handleChange, handleSubmit } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>setup quiz</h2>

          {/* AMOUNT */}
          <div className="form-control">
            <label htmlFor="amount">questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={30}
            />
          </div>

          {/* CATEGORY */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="art">Art</option>
              <option value="animals">Animals</option>
              <option value="history">History</option>
              <option value="mythology">Mythology</option>
              <option value="geography">Geography</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          {/* DIFFICULTY */}
          <div className="form-control">
            <label htmlFor="difficulty">difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {isError && (
            <p className="error">
              cannot generate questions, please try different options
            </p>
          )}
          <button className="submit-btn" onClick={handleSubmit} type="submit">
            start
          </button>
        </form>
      </section>
    </main>
  );
};
export default SetupForm;
