import React, {useState} from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import { cleanObject } from '../utils/helpers'
import CaseCards from '../components/CaseCards'
import Themes from '../components/Themes'
import SiteBorderStyles from "../styles/SiteBorderStyles"


export default function CasesPage({ data: { page, collections } }) {
  const { title, hero, cornerstoneIcon, caseIcon  } = page.childMarkdownRemark.frontmatter

  // build themes (filter)
  const themes = collections.group
    .find(collection => collection.fieldValue === "theme")
    .nodes.map(node => (cleanObject(node.childMarkdownRemark.frontmatter)))

  // build cases
  const allCases = collections.group
    .find(collection => collection.fieldValue === "cases")
    .nodes.map(node => (cleanObject(node.childMarkdownRemark.frontmatter)))

  const [cases, setCases] = useState(allCases)

  return (
    <Layout>
      <Seo title={title} />
      <section className="pb-section bg-aqua">
        <Hero heading={hero.heading} description={`${allCases.length} ${hero.description}`} image={hero.image} />
      </section>
      <div id="wave-container">
        <div id="wave" />
      </div>
      <section className="py-section">
        <SiteBorderStyles>
          <CaseContentStyles>
            <Themes allCases={allCases} setCases={setCases} themes={themes}  />
            <CaseCards cases={cases} cornerstoneIcon={cornerstoneIcon} caseIcon={caseIcon} />
          </CaseContentStyles>
        </SiteBorderStyles>
      </section>
    </Layout>
  )
}

const CaseContentStyles = styled.div`
  display: grid;
  grid-gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: 3fr 1fr;

    div:first-child {
      grid-column: 2 / -1;
      grid-row: 1 / -1;
    }
    div:last-child {
      grid-column: 1 / 2;
      grid-row: 1 / -1;
    }
  }
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
                  gatsbyImageData(
                    width: 400
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
          }
          cornerstoneIcon {
            childImageSharp {
              gatsbyImageData(
                width: 50
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
          caseIcon {
            childImageSharp {
              gatsbyImageData(
                width: 50
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
    collections: allFile(filter: {relativeDirectory: {in: ["cases", "theme"]}}) {
      group(field: relativeDirectory) {
        fieldValue
        nodes {
          childMarkdownRemark {
            frontmatter {
              isCornerstone
              category
              caseName
              citation
              description
              takeaway
              url
              themes
            }
          }
        }
      }
    }
  }

`
