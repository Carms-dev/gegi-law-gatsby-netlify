import React, { useState } from "react"
import styled from "styled-components"
import Response from "./Response"
import { QuestionsSelect } from '../components/SimpleSelect'
import ScrollBtn from '../components/ScrollBtn'

export default function Question({ section, index, responseIcon, isLast, pageEndCTAs }) {
  const { question, description, selectLabel, options } = section

  const [selected, setSelected] = useState(``)
  const [response, setResponse] = useState(``)

  return (
    <QuestionStyles>
      <div className="question">
        <h3>{question}</h3>
        {description && <p>{description}</p>}
        <QuestionsSelect
          selectLabel={selectLabel}
          selected={selected}
          setSelected={setSelected}
          setResponse={setResponse}
          options={options}
          index={index}
        />
      </div>
      {response !== "" &&
        <Response
          icon={responseIcon}
          response={response}
          isLast={isLast}
          pageEndCTAs={pageEndCTAs} />
      }

      {/* No arrow down for the last question */}
      {!isLast &&
        <ScrollBtn index={index} />
      }
    </QuestionStyles>
  )
}

const QuestionStyles = styled.div`
  height: 100%;
  padding: 18vmax 20px 10vmax 20px;
  text-align: center;
  display: grid;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  transition: padding-top 1s ease;

  > * {
    max-width: 800px;
    margin: 0 auto;
  }

  h3 {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .question>div {
    margin-top: 1.5rem;
  }
  .response {
    max-height: 40vh;
    overflow-y: auto;
  }
  @media (min-width: 640px) {
    grid-gap: 30px;
  }
`
