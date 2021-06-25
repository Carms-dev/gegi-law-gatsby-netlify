import * as React from "react"
import styled from "styled-components"
// import { GatsbyImage } from "gatsby-plugin-image"
import { QuestionsSelect } from '../components/SimpleSelect'

export default function QuestionSection({ section, index }) {
  const { question, description, selectLabel, options } = section
  return (
    <QuestionSectionStyles>
      <h3>{question}</h3>
      <p>{description}</p>
      <QuestionsSelect selectLabel={selectLabel} options={options} index={index}/>
    </QuestionSectionStyles>
  )
}

const QuestionSectionStyles = styled.section`
  height: 100vh;
  padding: 20px;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;

  h3 {
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h3, p {
    margin-bottom: 1rem;
  }
`
