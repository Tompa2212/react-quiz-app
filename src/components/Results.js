import React from "react";
import { QuizContext } from "../context/context";
import trophy from "../img/finished_img.svg";
import styled from "styled-components";

const Results = () => {
  const { game, num_questions, restartGame } = React.useContext(QuizContext);

  const percentage = Math.floor((game.score / num_questions) * 100);

  return (
    <Wrapper>
      <img src={trophy} alt="trophy"></img>
      <div>
        <h2>Results</h2>
        <p>
          You got{" "}
          <span className={percentage >= 50 ? "above50" : "below50"}>
            {game.score}{" "}
          </span>
          correct answers
        </p>
        <p style={{ fontSize: "2.4rem" }}>{percentage}%</p>
      </div>
      <button onClick={restartGame}>Try Again</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 4rem;
  place-items: center;
  padding: 3rem;
  background: white;
  border-radius: 1.2rem;
  color: var(--blue-dark);
  text-align: center;

  img {
    width: 80%;
    max-width: 15rem;
  }

  h2 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  p {
    span {
      font-size: 2.4rem;
    }

    .above50 {
      color: var(--correct);
    }

    .below50 {
      color: var(--wrong);
    }
  }

  button {
    cursor: pointer;
    display: inline-block;
    background: white;
    padding: 0.6rem 2.5rem;
    font-size: inherit;
    font-family: inherit;
    color: var(--blue-dark);
    border: 2px solid var(--blue-dark);
    border-radius: 1.2rem;

    &:hover {
      background: var(--blue-dark);
      color: white;
    }
  }
`;

export default Results;
