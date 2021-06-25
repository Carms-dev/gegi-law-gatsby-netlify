import React, { useState } from "react"
import styled from "styled-components"
import ResponseCard from "./ResponseCard"
import { QuestionsSelect } from '../components/SimpleSelect'
import { IconButton } from "@material-ui/core"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

export default function QuestionSection({ section, index, className, responseIcon, count }) {
  const { question, description, selectLabel, options } = section

  const [selected, setSelected] = useState(``)
  const [response, setResponse] = useState(``)

  return (
    <QuestionSectionStyles id={`step-${index + 1}`} className={className} >
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
      {response !== "" && <ResponseCard icon={responseIcon} response={response} />}
      {/* No arrow down for the last question */}
      {(index !== count - 1) &&
        <IconButton
          aria-label="move downward"
          href={`#step-${index + 2}`}
          className="scroll-to"
        >
          <ArrowDownwardIcon size='medium'/>
        </IconButton>
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
