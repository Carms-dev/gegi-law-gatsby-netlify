import React from 'react'
import ReactMarkdown from 'react-markdown'
import { graphql } from 'gatsby'
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SiteBorderStyles from '../styles/SiteBorderStyles'

export default function PrivacyPolicyPage({ data }) {
  const { heading, image, privacyPolicy } = data.page.childMarkdownRemark.frontmatter.privacyPage
  console.log(heading, image, privacyPolicy)
  return (
    <Layout>
      <Seo title={heading} />
      <SiteBorderStyles>
        <PolicyPageStyles className="py-section">
          <GatsbyImage
            image={image.imageFile.childImageSharp.gatsbyImageData}
            alt={image.alt}
            imgStyle={{ width: `auto`, padding: `1rem` }}
          />
          <div>
            <h1>{heading}</h1>
            <ReactMarkdown>{privacyPolicy}</ReactMarkdown>
          </div>
        </PolicyPageStyles>
      </SiteBorderStyles>
    </Layout>
  )
}

const PolicyPageStyles = styled.div`
  display: grid;
  place-items: center;
  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
  @media (min-width: 640px) {
    grid-template-columns: 2fr 3fr;
    grid-auto-rows: 1fr;
    align-items: flex-start;
    grid-gap: 2rem;
  }
`

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "settings"}) {
      childMarkdownRemark {
        frontmatter {
          privacyPage {
            heading
            privacyPolicy
            image {
              alt
              imageFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 400
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`
