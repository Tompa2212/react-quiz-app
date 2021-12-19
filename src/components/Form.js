import React from "react";
import styled from "styled-components";
import { QuizContext } from "../context/context";
import quiz_logo from "../img/quiz_logo.svg";
import Results from "./Results";
import { FaGlobeAmericas } from "react-icons/fa";

const Form = () => {
  const { questions, q_index, checkAnswer, game, nextQuestion } =
    React.useContext(QuizContext);

  const { answered, finished } = game;

  if (finished) {
    return <Results />;
  }

  if (questions.length) {
    const flag = questions[q_index].flag;
    return (
      <Wrapper>
        <img className="quiz-logo" src={quiz_logo} alt="quiz logo"></img>
        <p className="question">{questions[q_index].question}</p>
        {flag && <img className="flag" src={flag} />}

        <div>
          {questions[q_index].offered.map((item, index) => {
            const flag = questions[q_index].correct === item;
            return (
              <button
                className={answered && flag ? "correct" : null}
                key={index}
                type="button"
                value={item}
                onClick={(e) => checkAnswer(item, q_index, e.target)}
              >
                <span>{String.fromCharCode(65 + index)}</span> {item}
              </button>
            );
          })}
        </div>
        {answered && (
          <button className="btn-next" onClick={nextQuestion}>
            Next
          </button>
        )}
      </Wrapper>
    );
  }

  return (
    <Wrapper style={{ textAlign: "center" }}>
      <h2>Creating quiz...</h2>
      <FaGlobeAmericas className="globe-loader" />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  position: relative;
  width: 100%;
  padding: 5rem 3rem;
  background: #fff;
  border-radius: 1rem;

  .quiz-logo {
    position: absolute;
    right: 0;
    top: -4.5rem;
    width: 10rem;
  }

  .flag {
    display: block;
    width: 70%;
    max-width: 15rem;
    margin-bottom: 3rem;
  }

  p {
    font-size: 2.4rem;
    color: var(--blue-light);
    font-weight: 700;
    margin-bottom: 3rem;
  }

  div {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    margin-bottom: 3rem;

    button {
      cursor: pointer;
      text-align: left;
      color: var(--blue-light);
      font-size: inherit;
      font-family: inherit;
      padding: 1rem;
      background: transparent;
      border: 2px solid var(--blue-light);
      border-radius: 1rem;

      span {
        display: inline-block;
        padding-right: 4rem;
        font-size: 2.1rem;
      }

      @media screen and (min-width: 70rem) {
        &:hover {
          color: var(--text-color);
          background: var(--btn-color);
          border: 2px solid var(--btn-color);
        }
      }
    }

    .correct {
      background: var(--correct);
      border: 2px solid var(--correct);
      color: white;
    }
    .wrong {
      background: var(--wrong);
      border: 2px solid var(--wrong);
      color: white;
    }
  }

  .btn-next {
    cursor: pointer;
    display: block;
    margin-left: auto;
    padding: 0.9rem 2.5rem;
    background: var(--btn-color);
    border: transparent;
    border-radius: 0.5rem;
    font-size: inherit;
    font-family: inherit;
    color: var(--text-color);
  }

  .globe-loader {
    position: relative;
    font-size: 15rem;
    color: var(--blue-dark);
    margin: 2rem;
    animation: loader-spin 3s infinite ease-in-out;
  }

  @keyframes loader-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(1turn);
    }
  }
`;

export default Form;
