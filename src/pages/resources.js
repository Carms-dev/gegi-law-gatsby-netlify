import React from 'react'
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { graphql } from 'gatsby'
import Hero from '../components/Hero'
import ResourceCards from '../components/ResourceCards'
import Filters from '../components/Filters'

export default function ResourcesPage({ data: { page, resources } }) {
  const { title, hero } = page.childMarkdownRemark.frontmatter

  return (
    <Layout>
      <Seo title={title} />
      <Hero heading={hero.heading} description={`${resources.nodes.length} ${hero.description}`} image={hero.image} />
      <Filters />
      <ResourceCards resources={resources} />
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
            resourceName
            eligibility
            serviceDescription
            website
            email
            phone
            resourceType
            locations
            cost
            logo {
              childImageSharp {
                gatsbyImageData(
                  width: 240
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

`
