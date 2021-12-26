import React, { useState, useEffect } from "react";
import { formatData, random_numbers, random_items } from "../util/util";

const QuizContext = React.createContext();

const countries_url = "https://restcountries.com/v3.1/all";
const num_questions = 5;

const question_template = [
  "is capital of which country?",
  "Which country does this flag belong to",
  "What is population of ",
  "Capital of",
];

const gameInitialState = {
  q_answered: false,
  score: 0,
  finished: false,
};

const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [q_index, setQIndex] = useState(0);
  const [game, setGame] = useState(gameInitialState);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      formQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formQuestions = (countries) => {
    const quiz = [];
    const quiz_countries = formatData(countries);
    const quiz_country_indexes = random_numbers(num_questions, quiz_countries.length);

    for (let index of quiz_country_indexes) {
      const country = quiz_countries[index];
      const { capital, flag, name, population } = country;

      const q_index = Math.floor(Math.random() * 4);

      if (q_index === 0) {
        const abcd = random_items(quiz_countries, 4, "name", name);

        quiz.push({
          question: `${capital} ${question_template[0]}`,
          offered: abcd,
          correct: name,
        });
      } else if (q_index === 1) {
        const abcd = random_items(quiz_countries, 4, "name", name);

        quiz.push({
          question: `${question_template[1]}`,
          flag,
          offered: abcd,
          correct: name,
        });
      } else if (q_index === 2) {
        let abcd = random_items(quiz_countries, 4, "population", population);
        abcd = abcd.map((num) => {
          return new Intl.NumberFormat().format(num);
        });

        quiz.push({
          question: `${question_template[2]}${name}`,
          offered: abcd,
          correct: new Intl.NumberFormat().format(population),
        });
      } else if (q_index === 3) {
        const abcd = random_items(quiz_countries, 4, "capital", capital);

        quiz.push({
          question: `${question_template[3]} ${name} is?`,
          offered: abcd,
          correct: capital,
        });
      }
    }

    setQuestions(quiz);
  };

  const checkAnswer = (answer, index, target) => {
    console.log(this);
    if (game.answered) return;

    if (answer === questions[index].correct) {
      setGame({ score: game.score + 1, answered: true });
    } else {
      setGame({ ...game, answered: true });
      target.classList.add("wrong");
    }
  };

  const nextQuestion = () => {
    if (q_index >= num_questions - 1) {
      setGame({ ...game, finished: true });
      return;
    }

    setQIndex(q_index + 1);
    setGame({ ...game, answered: false });

    const buttons = document.querySelectorAll("button");
    const spans = document.querySelectorAll("span");

    buttons.forEach((btn) => {
      btn.classList.remove("wrong");
    });

    spans.forEach((span) => (span.className = ""));
  };

  const restartGame = () => {
    setGame(gameInitialState);
    setQIndex(0);
    setQuestions([]);
    fetchData(countries_url);
  };
  useEffect(() => {
    fetchData(countries_url);
    // eslint-disable-next-line
  }, []);
  return (
    <QuizContext.Provider
      value={{
        num_questions,
        questions,
        q_index,
        setQIndex,
        checkAnswer,
        setGame,
        game,
        nextQuestion,
        restartGame,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
