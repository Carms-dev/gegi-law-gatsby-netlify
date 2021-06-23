import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import SimplePopover from "./SimplePopover"
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { IconButton } from "@material-ui/core"
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

export default function CaseCard({ cas, icon }) {
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
      <div>
        <div className="card-pre">
          <GatsbyImage
            image={icon.childImageSharp.gatsbyImageData}
            alt={hasWon ? 'Case Won Icon' : 'Case Lost Icon'}
            imgStyle={{ width: `auto` }}
          />
          <p style={{ color: `var(--grey)` }}>{citation} · {hasWon ? 'Won' : 'Lost'}</p>
        </div>
        <h3>
          <span style={{ marginRight: `0.5rem` }}>{caseName}</span>
          <Tooltip title="Open in Canlii" placement="right">
            <IconButton href={url} target='_blank' rel="noreferrer">
              <OpenInNewIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
        </h3>
      </div>
      <p className="card-text">{description}</p>
      {/* takeaways are optional */}
      {takeaway && <SimplePopover label="💡 GEGI's takeaway →" content={takeaway} />}
      <div className="card-tags">
        {themes.map(theme => (
          <Chip
            key={caseName + theme}
            variant="outlined"
            size="medium"
            label={theme}
            style={{ borderRadius: 8, marginRight: `0.5rem` }}
          />
        ))}
      </div>
    </CaseCardStyles>
  )
}

const CaseCardStyles = styled.div`
  margin-bottom: 4rem;

  .card-pre {
    display: inline-flex;
    align-items: center;
    p {
      margin-left: 0.5rem;
    }
  }
  .card-text {
    margin: 1rem 0;
  }
  .card-tags {
    margin: 1rem 0;
  }
`
