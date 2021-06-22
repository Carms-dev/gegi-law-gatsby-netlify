import * as React from "react"
import styled from "styled-components"
import CaseCard from './CaseCard'

export default function CaseCards({ cases, wonIcon, lostIcon }) {
  return (
    <CaseCardsStyles>
      {cases.map(cas => (<CaseCard key={cas.caseName + `Card`} cas={cas} icon={cas.hasWon ? wonIcon : lostIcon} />))}
    </CaseCardsStyles>
  )
}

const CaseCardsStyles = styled.div``
