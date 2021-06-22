import * as React from "react"
import styled from "styled-components"
import CaseCard from './CaseCard'

export default function CaseCards({ cases }) {
  return (
    <CaseCardsStyles>
      {cases.map(cas => (<CaseCard cas={cas} />))}
    </CaseCardsStyles>
  )
}

const CaseCardsStyles = styled.section`
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
  grid-gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

`
