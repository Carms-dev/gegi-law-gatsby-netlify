import * as React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import SiteBorderStyles from "../styles/SiteBorderStyles"

export default function Hero({ heading, description, image }) {
  return (
    <SiteBorderStyles>
      <HeroStyles>
        <GatsbyImage
          image={image.imageFile.childImageSharp.gatsbyImageData}
          alt={image.alt}
          imgStyle={{width: `auto`, padding: `1.5rem`}}
        />
        <div>
          <h1>{heading}</h1>
          <p>{description}</p>
        </div>
      </HeroStyles>
    </SiteBorderStyles>
  )
}

const HeroStyles = styled.div`
  display: grid;
  text-align: center;
  justify-content: center;
  h1 {
    margin-bottom: 1rem;
  }
  @media (min-width: 640px) {
    grid-template-columns: 2fr 3fr;
    grid-auto-rows: 1fr;
    align-items: center;
    text-align: left;
    /* direction: rtl; */
    grid-gap: 2rem;
  }
  @media (min-width: 1280px) {
    .wrapper-content {
      grid-gap: 6rem;
    }
  }
`
