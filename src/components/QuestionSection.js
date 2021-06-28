import React, { useState } from "react"
import styled from "styled-components"
import ResponseCard from "./ResponseCard"
import { QuestionsSelect } from '../components/SimpleSelect'
import ScrollBtn from '../components/ScrollBtn'

export default function QuestionSection({ section, index, className, responseIcon, anchors, setStep, isLast }) {
  const { question, description, selectLabel, options } = section

  const [selected, setSelected] = useState(``)
  const [response, setResponse] = useState(``)

  return (
    <QuestionSectionStyles id={anchors[index]} className={className} >
      <h3>{question}</h3>
      {description && <p>{description}</p>}
      <QuestionsSelect
        selectLabel={selectLabel}
        selected={selected}
        setSelected={setSelected}
        setResponse={setResponse}
        options={options}
        index={index}
        anchors={anchors}
      />
      {response !== "" && <ResponseCard icon={responseIcon} response={response} />}

      {/* No arrow down for the last question */}
      {!isLast &&
        <ScrollBtn
          index={index + 1}
          anchors={anchors}
          setStep={setStep} />
      }
    </QuestionSectionStyles>
  )
}

const QuestionSectionStyles = styled.section`
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
