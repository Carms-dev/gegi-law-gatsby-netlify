import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

export default function ResponseCard({ icon, response }) {
  return (
    <ResponseCardStyles>
      <GatsbyImage
        image={icon.childImageSharp.gatsbyImageData}
        alt="Response Icon"
        imgStyle={{ width: `auto` }} />
      <div className="card-text">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </ResponseCardStyles>
  )
}

const ResponseCardStyles = styled.div`
  flex: 1;
  display: grid;
  justify-items: center;
  grid-gap: 1rem;
  text-align: left;

  .card-text {
    max-height: 30vh;
    overflow-y: scroll;
  }

  @media (min-width: 640px) {
    grid-template-columns: 50px 1fr;
    grid-gap: 2rem;
    place-items: flex-start;
    place-content: center;

    .card-text {
      max-height: unset;
      overflow-y: unset;
    }
  }
`
