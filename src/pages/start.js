import React, { useState, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Indicator from '../components/Indicator'
import { Disclaimer } from '../components/Alert'
import { Hero } from '../components/Hero'
import Question from '../components/Question'
import ScrollBtn from '../components/ScrollBtn'
import SiteBorderStyles from '../styles/SiteBorderStyles'


function GetStartedPage({ data: { page } }) {
  const { title, hero, questions, responseIcon, disclaimer, pageEndCTAs } = page.childMarkdownRemark.frontmatter

  // you can access the elements with itemsRef.current[n]
  const sectionRefs = useRef([]);
  sectionRefs.current = []

  // Compile all the refs
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  const [step, setStep] = useState(0)

  useEffect(() => {
    // Set up observer
    const options = { rootMargin: "-300px" }

    const callback = ([entry]) => {
      if (entry.isIntersecting) {
        // setStep
        const currentStep = parseInt(entry.target.dataset.step)
        setStep(currentStep)
      }
    }

    const observer = new IntersectionObserver(callback, options)

    // Observer to observe each ref
    sectionRefs.current.forEach(sectionRef => {
      if (sectionRef) {
        observer.observe(sectionRef)
      }
    })

    // Clean up Observer to unobserve each ref
    return () => {
      sectionRefs.current.forEach(sectionRef => {
        if (sectionRef) {
          observer.unobserve(sectionRef)
        }
      })
    }
  }, [questions.length, sectionRefs, step])

  return (
    <Layout>
      <Seo title={title} />
      <StartPageStyles>
        <Disclaimer disclaimer={disclaimer} />
        <Indicator step={step} count={questions.length + 1} />
        <section
          className="section section-intro"
          id="intro"
          data-step="0"
          ref={addToRefs}
        >
          <Hero
            heading={hero.heading}
            description={hero.description}
            image={hero.image} />
          <ScrollBtn index={0} />
        </section>
        {questions.map((section, index) => (
          <section ref={addToRefs} data-step={index + 1} key={`question-${index + 1}`} >
            <Question
              section={section}
              index={index + 1}
              className="section"
              responseIcon={responseIcon}
              isLast={index === questions.length - 1}
              pageEndCTAs={pageEndCTAs}
            />
          </section>
        ))}
        {/* Call to action */}
        <SiteBorderStyles>
          <div id="cta">
            {pageEndCTAs.map(cta => (
              <Link key={cta.heading} to={cta.pageLink} className="card card-cta">
                <GatsbyImage
                  image={cta.icon.imageFile.childImageSharp.gatsbyImageData}
                  alt={cta.icon.alt}
                  imgStyle={{ width: `auto` }} />
                <p>{cta.heading}</p>
              </Link>
            ))}
          </div>
        </SiteBorderStyles>
      </StartPageStyles>
    </Layout>
  )
}

export default GetStartedPage

const StartPageStyles = styled.div`
  position: relative;

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .section#intro {
    min-height: 100vh;
    margin-top: -108px;
    padding-top: 108px;
  }
  .reduce-pt {
    padding-top: 5vmax;
  }
  p {
    margin-bottom: 0.5rem;
  }

  /* CTA cards */
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

  @media (min-width: 640px) {
    .section#intro {
      padding-top: 30vh;
    }
    #cta {
      grid-gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1024px) {
    #cta {
      grid-gap: 3rem;
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
  }
`

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
          disclaimer {
            heading
            description
          }
          responseIcon {
            childImageSharp {
              gatsbyImageData(
                width: 50
                placeholder: BLURRED
                layout: CONSTRAINED
              )
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
          pageEndCTAs {
            heading
            pageLink
            icon {
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
        }
      }
    }
  }
`
