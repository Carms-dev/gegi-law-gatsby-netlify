import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

export default function Response({ icon, response, isLast, pageEndCTAs }) {
  return (
    <div className="response">
      <ResponseStyles>
        <GatsbyImage
          image={icon?.childImageSharp.gatsbyImageData}
          alt="Response Icon"
          imgStyle={{ width: `auto` }} />
        <div className="content-wrapper">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </ResponseStyles>
      {isLast &&
        <div id="cta">
          {pageEndCTAs.map(cta => (
            <Link key={cta.heading} to={cta.pageLink} className="card card-cta">
              <GatsbyImage
                image={cta.icon.imageFile?.childImageSharp.gatsbyImageData}
                alt={cta.icon.alt}
                imgStyle={{ width: `auto` }}
              />
              <p>{cta.heading}</p>
            </Link>
          ))}
        </div>
      }
    </div>
  )
}

const ResponseStyles = styled.div`
  flex: 1;
  display: grid;
  justify-items: center;
  grid-gap: 1rem;
  text-align: left;

  .content-wrapper {
    max-height: 50vh;
    overflow-y: scroll;
  }

  @media (min-width: 640px) {
    grid-template-columns: 50px 1fr;
    grid-gap: 2rem;
    place-items: flex-start;
    place-content: center;

    .content-wrapper {
      max-height: unset;
      overflow-y: unset;
    }
  }
`
