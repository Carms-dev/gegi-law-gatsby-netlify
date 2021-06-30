import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SiteBorderStyles from '../styles/SiteBorderStyles'
import styled from 'styled-components'

export default function IndexPage({ data: { page, collections, cornerstones } }) {
  // Destructure page content
  const {
    title,
    hero,
    secondaryCTAs,
    supporterLabel,
    caseSection,
    aboutSection,
    statisticsSection
  } = page.childMarkdownRemark.frontmatter

  // Compile supporters collection
  const supporters = collections.group
  .find(collection => collection.fieldValue === "supporters")
  .nodes.map(node => (node.childMarkdownRemark.frontmatter))

  // Get case count
  const caseCount = collections.group
  .find(collection => collection.fieldValue === "cases")
  .nodes.length

  // Get resource count
  const resourceCount = collections.group
  .find(collection => collection.fieldValue === "resources")
  .nodes.length

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

          {/* supporter logo garden */}
          <section id="supporter" className="py-section">
            <p>{supporterLabel}</p>
            <div id="logo-garden">
              {supporters.map(supporter => (
                <a key={supporter.title} href={supporter.url} target='_blank' rel="noreferrer">
                  <GatsbyImage
                    image={supporter.logo.childImageSharp.gatsbyImageData}
                    alt={`${supporter.title} Logo`} />
                </a>
              ))}
            </div>
          </section>

          {/* Cornerstone cases */}
          <section id="cornerstone" className="py-section">
            <div className="card bg-aqua">
              <h2>{cornerstones.nodes.length} {caseSection.heading}</h2>
              <p>{caseSection.description}</p>
              <Link className="btn" to="/cases">{caseSection.linkText}</Link>
            </div>
            {cornerstones.nodes.map(node => {
              const cas = node.frontmatter
              return (
                <Link to="/cases" key={cas.caseName} className="card">
                  <h3>{cas.caseName}</h3>
                  <p>{cas.takeaway}</p>
                </Link>
              )
            })}
          </section>

          {/* About section */}
          <section id="about" className="py-section">
            <GatsbyImage
              image={aboutSection.image.imageFile.childImageSharp.gatsbyImageData}
              alt={aboutSection.image.alt}
              imgStyle={{ width: `auto`, padding: `3rem` }}
            />
            <div>
              <h2>{aboutSection.heading}</h2>
              <ReactMarkdown>{aboutSection.description}</ReactMarkdown>
            </div>
          </section>

          {/* Statistics section */}
          <section id="stats" className="py-section">
            <Link to="/cases" className="card">
              <h3>{caseCount}</h3>
              <p>{statisticsSection.caseLabel}</p>
            </Link>
            <Link to="/resources" className="card">
              <h3>{resourceCount}</h3>
              <p>{statisticsSection.resourceLabel}</p>
            </Link>
            <Link to="/"className="card">
              <h3>{statisticsSection.provinceCount}</h3>
              <p>{statisticsSection.provinceLabel}</p>
            </Link>
          </section>
        </SiteBorderStyles>
      </HomePageStyles>
    </Layout>
  )
}

const HomePageStyles = styled.div`
  h2, h3 {
    margin-bottom: 1rem;
  }
  /* hero */
  #hero {
    h1 {
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.25rem;
      margin-bottom: 4rem;
    }
  }
  .card {
    font-weight: 400;
  }
  /* Call to action */
  #cta {
    display: grid;
    grid-gap: 1rem;
    padding: 2rem 0;

    .card-cta {
      padding: 1rem;
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
  }

  /* supporter */
  #supporter {
    p {
      text-align: center;
      color: var(--grey);
    }
  }

  /* logos */
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

  /* cornerstone */
  #cornerstone {
    display: grid;
    grid-gap: 1rem;

    > .card {
      padding: 1rem;
      background: var(--aqua-xlight);
    }
    .card:first-child {
      padding: 3rem;
      background: var(--aqua-light);
      display: grid;
      place-content: center;
      text-align: center;
      p {
        margin-bottom: 3rem;
      }
    }
  }

  /* about */
  #about {
    display: grid;
    grid-gap: 2rem;
    place-items: center;

    p {
      margin-bottom: 0.5rem;
    }
  }

  /* stats */
  #stats {
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
    grid-gap: 1rem;

    h3 {
      font-size: 3rem;
    }
    .card {
      padding: 2rem;
      text-align: center;
    }
    .card:first-child {
      background: var(--yellow-light);
    }
    .card:nth-child(2) {
      background: var(--peach-light);
    }
    .card:last-child {
      background: var(--aqua-xlight);
    }
  }

  @media (min-width: 640px) {
    #hero {
      text-align: center;
    }
    #cta {
      grid-gap: 3rem;
      grid-template-columns: repeat(2, 1fr);
    }
    #logo-garden {
      overflow-x: hidden;
      justify-content: center;
    }
    #cornerstone {
      > .card {
        padding: 2rem;
      }
    }
    #about {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    #cta {
      margin-top: -6rem;
      grid-template-columns: repeat(2, 420px);
      justify-content: center;

      .card-cta {
        padding: 2rem;
        grid-template-columns: 1fr;
        place-items: center;
        text-align: center;

        p {
          font-size: 1.25rem;
        }
      }
    }
    #cornerstone {
      grid-template-columns: repeat(2, 1fr);

      .card:first-child {
        grid-row: 1 / 3;
      }
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
            provinceCount
          }
        }
      }
    }
    collections: allFile(filter: {relativeDirectory: {in: ["cases", "resources", "supporters"]}}) {
      group(field: relativeDirectory) {
        fieldValue
        nodes {
          childMarkdownRemark {
            frontmatter {
              title
              url
              logo {
                childImageSharp {
                  gatsbyImageData(width: 200, placeholder: BLURRED, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
    }
    cornerstones: allMarkdownRemark(filter: {frontmatter: {isCornerstone: {eq: true}}}) {
      nodes {
        frontmatter {
          caseName
          takeaway
        }
      }
    }
  }
`
