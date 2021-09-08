import React from 'react'
import ReactMarkdown from 'react-markdown'
import { graphql } from 'gatsby'
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function PrivacyPolicyPage({ data }) {
  const { siteImage, privacyPage: { heading, description } } = data.page.childMarkdownRemark.frontmatter

  return (
    <Layout>
      <Seo title={heading} />
      <PolicyPageStyles className="py-section">
        <GatsbyImage
          image={siteImage.imageFile?.childImageSharp.gatsbyImageData}
          alt={siteImage.alt}
          imgStyle={{ width: `auto`, padding: `1rem` }}
        />
        <div>
          <h1>{heading}</h1>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </PolicyPageStyles>
    </Layout>
  )
}

const PolicyPageStyles = styled.div`
  padding: 2rem 20px;
  max-width: 640px;
  margin: auto;
  text-align: center;

  display: grid;
  grid-gap: 1rem;
  min-height: calc(100vh - 200px);
  place-content: space-evenly;
  justify-items: center;

  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 0.5rem;
  }

  @media (min-width: 640px) {
    padding: 3rem 20px;
  }
`

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "settings"}) {
      childMarkdownRemark {
        frontmatter {
          siteImage {
            imageFile {
              childImageSharp {
                gatsbyImageData(
                  width: 400
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
            alt
          }
          privacyPage {
            heading
            description
          }
        }
      }
    }
  }
`
