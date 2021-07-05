import React from 'react'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

export default function Response({ icon, response, isLast, pageEndCTAs }) {
  return (
    <ResponseStyles>
      <GatsbyImage
        image={icon.childImageSharp.gatsbyImageData}
        alt="Response Icon"
        imgStyle={{ width: `auto` }} />
      <div className="content-wrapper">
        <ReactMarkdown>{response}</ReactMarkdown>
        {isLast &&
          <div className="cards-cta">
            {pageEndCTAs.map(cta => (
              <Link key={cta.heading} to={cta.pageLink} className="card">
                <GatsbyImage
                  image={cta.icon.imageFile.childImageSharp.gatsbyImageData}
                  alt={cta.icon.alt}
                  imgStyle={{ width: `auto` }} />
                <p>{cta.heading}</p>
              </Link>
            ))}
          </div>
        }
      </div>
    </ResponseStyles>
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

  .cards-cta {
    padding: 1rem 0;
    display: grid;
    grid-gap: 1rem;
    .card {
      padding: 1rem;
      display: grid;
      grid-template-columns: 70px 1fr;
      align-items: center;
      grid-gap: 1rem;
      font-weight: 400;
    }
    .card:first-child {
      background: var(--yellow-light);
    }
    .card:last-child {
      background: var(--peach-light);
    }
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
