import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SiteBorderStyles from "../styles/SiteBorderStyles"
import Hero from '../components/Hero'

export default function GetStartedPage({ data: { page } }) {
  const { title, hero, questions } = page.childMarkdownRemark.frontmatter
  console.log(title, hero, questions)
  return (
    <Layout>
      <Seo title={title} />
      <SiteBorderStyles>
        <Hero heading={hero.heading} description={hero.description} image={hero.image} />
      </SiteBorderStyles>
    </Layout>
  )
}

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "pages"}, name: {eq: "start"}) {
      childMarkdownRemark {
        frontmatter {
          title
          hero {
            heading
            description
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
          questions {
            question
            description
            selectLabel
            options {
              option
              response
            }
          }
        }
      }
    }
  }
`