import { useGlobalContext } from "./context";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";

export default function App() {
  const {
    isWaiting,
    isLoading,
    questions,
    index,
    correct,
    nextQuestion,
    isModalOpen,
    checkAnswer,
  } = useGlobalContext();

  if (isWaiting) {
    return <SetupForm />;
  }
  if (isLoading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer].sort(() =>
    Math.random() > 0.5 ? 1 : -1  // mixing the answers
  );

  return (
    <main>
      <Modal />

      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct} / {index}
        </p>

        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => checkAnswer(answer === correct_answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}
