import React, { useState } from "react"
import styled from "styled-components"
import Response from "./Response"
import { QuestionsSelect } from '../components/SimpleSelect'
import ScrollBtn from '../components/ScrollBtn'

export default function Question({ section, index, className, responseIcon, isLast, pageEndCTAs }) {
  const { question, description, selectLabel, options } = section

  const [selected, setSelected] = useState(``)
  const [response, setResponse] = useState(``)

  return (
    <QuestionStyles
      className={className}
    >
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
  min-height: 100vh;
  padding: 0 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding-top: 20vmax;
  transition: padding-top 0.8s ease;
  > * {
    margin: 1rem 0;
  }
  > p {
    margin-top: 0;
  }
  h3 {
    font-weight: 500;
  }
`
