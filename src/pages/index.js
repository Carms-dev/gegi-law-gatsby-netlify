import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SiteBorderStyles from '../styles/SiteBorderStyles'
import styled from 'styled-components'


export default function IndexPage({ data: { page, supporters, cases }}) {
  const {
    title,
    hero,
    secondaryCTAs,
    supporterLabel,
    caseSection,
    aboutSection,
    statisticsSection
  } = page.childMarkdownRemark.frontmatter

  return (
    <Layout>
      <Seo title={title} />
      <HomePageStyles>
        {/* hero section */}
        <section className="py-section bg-aqua" id="hero">
          <SiteBorderStyles>
            <h1>{hero.heading}</h1>
            <p>{hero.description}</p>
            <Link className="btn" to='/start'>{hero.linkText}</Link>
          </SiteBorderStyles>
        </section>
        <div id="curve" />
        {/* secondary call to action */}
        <SiteBorderStyles>
          <section id="cta">
            <Link to="/resources" className="card card-cta">
              <GatsbyImage
                image={secondaryCTAs.resourceIcon.imageFile.childImageSharp.gatsbyImageData}
                alt={secondaryCTAs.resourceIcon.alt}
                imgStyle={{ width: `auto` }} />
              <p>{secondaryCTAs.resourceCTA}</p>
            </Link>
            <Link to="/cases" className="card card-cta">
              <GatsbyImage
                image={secondaryCTAs.caseIcon.imageFile.childImageSharp.gatsbyImageData}
                alt={secondaryCTAs.caseIcon.alt}
                imgStyle={{ width: `auto` }} />
              <p>{secondaryCTAs.caseCTA}</p>
            </Link>
          </section>
        </SiteBorderStyles>
        {/* supporter logo garden */}

        <SiteBorderStyles>
          <section id="supporter" className="py-section">
            <p>{supporterLabel}</p>
            <div id="logo-garden">
              {supporters.nodes.map(node =>{
                const supporter = node.childMarkdownRemark.frontmatter
                return (
                  <a href={supporter.url}>
                    <GatsbyImage
                      image={supporter.logo.childImageSharp.gatsbyImageData}
                      alt={`${supporter.title} Logo`} />
                  </a>
                )
              })}
            </div>
          </section>
        </SiteBorderStyles>
        {/* Cornerstone cases */}
        <section>

        </section>
        {/* About section */}
        <section id="about">

        </section>
        {/* Statistics section */}
        <section id="statistics">

        </section>
      </HomePageStyles>
    </Layout>
  )
}

const HomePageStyles = styled.div`
  #hero {
    h1 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.25rem;
      margin-bottom: 3rem;
    }
  }

  /* Call to action */
  #cta {
    display: grid;
    grid-gap: 1rem;
    padding: 2rem 0;
  }
  .card-cta {
    padding: 1rem;
    border-radius: 12px;
    display: grid;
    grid-template-columns: 70px 1fr;
    align-items: center;
    grid-gap: 1rem;
    font-weight: 400;
  }
  .card-cta:first-child {
    background-color: var(--yellow-light);
  }
  .card-cta:last-child {
    background-color: var(--peach-light);
  }

  /* supporter */
  #supporter {
    p {
      text-align: center;
      color: var(--grey);
    }
  }

  #logo-garden {
    overflow-x: scroll;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 200px;
    align-items: center;
    grid-gap: 2rem;

    > * {
      display: inline-block
    }
  }

  @media (min-width: 640px) {
    #hero {
      text-align: center;
    }
    #cta {
      grid-gap: 2rem;
      grid-template-columns: repeat(2, 1fr);
    }
    #logo-garden {
      justify-content: center;
    }
  }

  @media (min-width: 1024px) {
    #cta {
      margin-top: -6rem;
      grid-template-columns: repeat(2, 420px);
      justify-content: center;
    }
    .card-cta {
      padding: 2rem;
      grid-template-columns: 1fr;
      place-items: center;
      text-align: center;
      p {
        font-size: 1.25rem;
      }
    }
    #logo-garden {
      d
    }
  }

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
            resourceIcon {
              alt
              imageFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 70
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
            caseIcon {
              alt
              imageFile {
                childImageSharp {
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
                  width: 200
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
