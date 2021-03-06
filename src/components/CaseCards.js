import * as React from "react"
import styled from "styled-components"
import CaseCard from './CaseCard'

export default function CaseCards({ cases, cornerstoneIcon, caseIcon }) {
  return (
    <CaseCardsStyles>
      {cases.map((cas, index) => (
        <CaseCard
          key={`${cas.caseName}-${index}`}
          cas={cas}
          icon={cas.isCornerstone ? cornerstoneIcon : caseIcon} />
      ))}
    </CaseCardsStyles>
  )
}

const CaseCardsStyles = styled.div``
