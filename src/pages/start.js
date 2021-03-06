import React, { useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Indicator from '../components/Indicator'
import { Disclaimer } from '../components/Alert'
import { Hero } from '../components/Hero'
import Question from '../components/Question'
import ScrollBtn from '../components/ScrollBtn'


function GetStartedPage({ data: { page } }) {
  const { title, hero, questions, responseIcon, disclaimer, pageEndCTAs } = page.childMarkdownRemark.frontmatter


  // You can access the elements with itemsRef.current[n]
  const sectionRefs = useRef([]);

  // Set a reference to pause the observer effects on scroll
  const pausedRef = useRef(false)
  // Compile all the refs
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  const [step, setStep] = useState(0)

  useEffect(() => {
    // Set up observer
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Update the step
        const updatedStep = parseInt(entry.target.dataset.step)
        setStep(updatedStep)

        // Scroll into view
        if (!pausedRef.current) {
          const top = entry.target.offsetTop;
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }, { threshold: 0.05 })

    const refs = sectionRefs.current
    // Observer to observe each ref
    refs.forEach(ref => {
      if (ref) {
        observer.observe(ref)
      }
    })

    // Clean up Observer to unobserve each ref
    return () => {
      refs.current?.forEach(ref => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [sectionRefs, pausedRef])

  return (
    <Layout pausedRef={pausedRef}>
      <Seo title={title} />
      <StartPageStyles>
        <Disclaimer disclaimer={disclaimer} />
        {/* Indicator with Navigation buttons on the right */}
        <Indicator
          step={step}
          sectionRefs={sectionRefs}
          count={questions.length + 1}
          pausedRef={pausedRef}
        />

        <section id="intro"data-step="0" ref={addToRefs}>
          <Hero
            heading={hero.heading}
            description={hero.description}
            image={hero.image}
          />
          <ScrollBtn index={0} sectionRefs={sectionRefs} />
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
              sectionRefs={sectionRefs}
            />
          </section>
        ))}

      </StartPageStyles>
    </Layout>
  )
}

export default GetStartedPage

const StartPageStyles = styled.div`
  position: relative;

  section {
    min-height: 100vh;
    display: grid;
    align-items: center;
  }
  section#intro {
    position: relative;
    margin-top: -108px;
    padding-top: 108px;
    padding-bottom: 10vmax;

    h1 {
      margin-top: -2.5rem;
      margin-bottom: 0.5rem;
    }
  }

  p {
    margin-bottom: 0.5rem;
  }

  section:last-child .response {
    padding-top: 20px;
    max-height: unset;
  }

  /* CTA cards */
  #cta {
    display: grid;
    grid-gap: 1rem;
    padding-top: 2rem;

    .card-cta {
      padding: 1rem;
      display: grid;
      place-items: center;
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
    section#intro {
      h1 {
        margin-top: 0rem;
        margin-bottom: 1rem;
      }
    }
    #cta {
      grid-gap: 2rem;
      grid-template-columns: 1fr 1fr;
      justify-content: center;

      .card-cta {
        grid-template-columns: 1fr;
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
