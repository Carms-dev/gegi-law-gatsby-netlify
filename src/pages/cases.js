import React, {useState} from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import { cleanObject } from '../utils/helpers'
import CaseCards from '../components/CaseCards'
import Themes from '../components/Themes'


// markup
export default function CasesPage({ data: { page, collections } }) {
  const { title, hero } = page.childMarkdownRemark.frontmatter

  // build themes
  const themes = collections.group
    .find(collection => collection.fieldValue === "themes")
    .nodes.map(node => (cleanObject(node.childMarkdownRemark.frontmatter)))

  // build cases
  const allCases = collections.group
    .find(collection => collection.fieldValue === "cases")
    .nodes.map(node => (cleanObject(node.childMarkdownRemark.frontmatter)))

  const [cases, setCases] = useState(allCases)

  return (
    <Layout>
      <Seo title={title} />
      <Hero heading={hero.heading} description={`${allCases.length} ${hero.description}`} image={hero.image} />
      <CaseContentStyles>
        <Themes allCases={allCases} setCases={setCases} themes={themes}  />
        <CaseCards cases={cases} />
      </CaseContentStyles>
    </Layout>
  )
}

const CaseContentStyles = styled.section`
  display: grid;
`

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "pages"}, name: {eq: "cases"}) {
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
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
    collections: allFile(filter: {relativeDirectory: {in: ["cases", "themes"]}}) {
      group(field: relativeDirectory) {
        fieldValue
        nodes {
          childMarkdownRemark {
            frontmatter {
              category
              caseName
              citation
              description
              takeaway
              hasWon
              url
              themes
            }
          }
        }
      }
    }
  }

`