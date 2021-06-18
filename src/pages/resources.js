import React from 'react'
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { graphql } from 'gatsby'
import Hero from '../components/Hero'
import SimpleSelect from '../components/SimpleSelect'

export default function ResourcesPage({ data: { page, resources } }) {
  const { title, hero } = page.childMarkdownRemark.frontmatter
  console.log(page, resources)

  return (
    <Layout>
      <Seo title={title} />
      <Hero heading={hero.heading} description={hero.description} image={hero.image} />
      <SimpleSelect />
    </Layout>
  )
}

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "pages"}, name: {eq: "resources-page"}) {
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
        }
      }
    }
    resources: allFile(filter: {relativeDirectory: {eq: "resources"}}) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            name
            eligibility
            serviceDescription
            website
            email
            phone
            logo {
              childImageSharp {
                gatsbyImageData(
                  width: 240
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
            orgOrFirm
            locations
            cost
          }
        }
      }
    }
  }

`
