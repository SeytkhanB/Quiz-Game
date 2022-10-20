import axios from "axios";
import { useState, useContext, useEffect, createContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  art: 25,
  mythology: 20,
  geography: 22,
  animals: 27,
};
const API_ENDPOINT = "https://opentdb.com/api.php?";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true); // isWaiting <-- for inputs completing
  const [isLoading, setIsLoading] = useState(false); // isLoading <-- for receiving questions
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 5,
    category: "art",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setIsLoading(true);
    setIsWaiting(false);
    try {
      const { data } = await axios(url);
      if (data.results.length > 0) {
        setQuestions(data.results);
        setIsLoading(false);
        setIsWaiting(false);
        setIsError(false);
      } else {
        setIsWaiting(true);
        setIsError(true);
      }
    } catch (error) {
      setIsWaiting(true);
      console.log(error);
    }
  };

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url)
  };

  return (
    <AppContext.Provider
      value={{
        isWaiting,
        isLoading,
        questions,
        index,
        correct,
        isError,
        isModalOpen,
        quiz,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
