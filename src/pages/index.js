import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SiteBorderStyles from '../styles/SiteBorderStyles'
// import HeroHome from '../components/HeroHome'
import styled from 'styled-components'


export default function IndexPage({ data: { page, supporters, cases }}) {
  console.log(page, supporters, cases)

  const {
    title,
    hero,
    secondaryCTAs,
    supporterLabel,
    caseSection,
    aboutSection,
    statisticsSection
  } = page.childMarkdownRemark.frontmatter

  console.log(page.childMarkdownRemark.frontmatter)

  return (
    <Layout>
      <Seo title={title} />
      <HomePageStyles>
        {/* hero section */}
        <section className="py-section bg-aqua" id="home-hero">
          <SiteBorderStyles>
            <h1>{hero.heading}</h1>
            <p>{hero.description}</p>
            <Link className="btn" to='/start'>{hero.linkText}</Link>
          </SiteBorderStyles>
        </section>
        <div id="curve" />
        {/* secondary call to action */}
        {/* supporter logo garden */}
        {/* Cornerstone cases */}
        {/* About section */}
        {/* Statistics section */}
      </HomePageStyles>
    </Layout>
  )
}

const HomePageStyles = styled.div`

`

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "pages"}, name: {eq: "home"}) {
      childMarkdownRemark {
        frontmatter {
          title
          hero {
            heading
            description
            linkText
          }
          secondaryCTAs {
            resourceCTA
            caseCTA
            resourcePageIcon {
              alt
              imageFile {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 70
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
            casePageIcon {
              alt
              imageFile {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 70
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
          }
          supporterLabel
          caseSection {
            heading
            description
            linkText
          }
          aboutSection {
            heading
            description
            image {
              alt
              imageFile {
                childrenImageSharp {
                  gatsbyImageData(
                    width: 400
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
          }
          statisticsSection {
            caseLabel
            resourceLabel
            provinceLabel
            provinceNum
          }
        }
      }
    }
    supporters: allFile(filter: {relativeDirectory: {eq: "supporter"}}) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            title
            url
            logo {
              childImageSharp {
                gatsbyImageData(
                  width: 100
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
    cases: allMarkdownRemark(filter: {frontmatter: {isCornerstone: {eq: true}}}) {
      nodes {
        frontmatter {
          caseName
          takeaway
        }
      }
    }
  }
`
