import * as React from "react"
import styled from "styled-components"
import SimplePopover from "./SimplePopover"
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { IconButton } from "@material-ui/core"
import Chip from '@material-ui/core/Chip';

export default function CaseCard({ cas }) {
  const { 
    caseName,
    citation,
    description,
    takeaway,
    hasWon,
    url,
    themes,
  } = cas

  return (
    <CaseCardStyles>
      <div style={{color: `var(--grey)`}}>{citation} · {hasWon ? 'Won' : 'Lost'}</div>
      <h3>
        {caseName}
        <IconButton aria-label="Open in Canlii" href={url} target='_blank'>
          <OpenInNewIcon fontSize='medium' />
        </IconButton>
      </h3>
      <SimplePopover label="Key takeaway →" content={takeaway} />
      <p>{description}</p>
      <div>
        {themes.map(theme => (<Chip variant="outlined" size="medium" label={theme} />))}
      </div>
    </CaseCardStyles>
  )
}

const CaseCardStyles = styled.div`

`
