import React from "react";
import styled from "styled-components";
import { QuizContext } from "./context/context";
import Form from "./components/Form";

const App = () => {
  return (
    <Wrapper>
      <h1>COUNTRY QUIZ</h1>
      <Form />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.section`
  width: 100%;
  max-width: 50rem;

  @media screen and (max-width: 56rem) {
    padding: 0rem 3rem;
  }
`;
