import * as React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import SimplePopover from "./SimplePopover"

export default function CaseCard({ cas }) {
  const { 
    caseName,
    takeaway
  } = cas

  return (
    <CaseCardStyles>
      <h3>{caseName}</h3>
      <SimplePopover label="Key takeaway →" content={takeaway} />
    </CaseCardStyles>
  )
}

const CaseCardStyles = styled.div``
