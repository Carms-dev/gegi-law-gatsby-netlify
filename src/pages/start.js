import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Indicator from '../components/Indicator'
import { Disclaimer } from '../components/Alert'
import { Hero } from '../components/Hero'
import QuestionSection from '../components/QuestionSection'
import ScrollBtn from '../components/ScrollBtn'

export default function GetStartedPage({ data: { page } }) {
  const { title, hero, questions, responseIcon, disclaimer, pageEndCTAs } = page.childMarkdownRemark.frontmatter

  // compile anchors
  const anchors = [...Array(questions.length).keys()].map(id => `step-${id + 1}`)
  anchors.unshift('intro')

  const [step, setStep] = useState(0)

  return (
    <Layout>
      <Seo title={title} />
      <StartPageStyles>
        <Disclaimer disclaimer={disclaimer} />
        <Indicator step={step} setStep={setStep} anchors={anchors} />
        <section className="section section-intro" id="intro">
          <Hero
            heading={hero.heading}
            description={hero.description}
            image={hero.image} />
          <ScrollBtn
            index={1}
            anchors={anchors}
            setStep={setStep} />
        </section>
        {questions.map((section, index) => (
          <QuestionSection
            key={section.question}
            section={section}
            index={index + 1}
            className="section"
            responseIcon={responseIcon}
            anchors={anchors}
            setStep={setStep}
            isLast={index === questions.length - 1}
            pageEndCTAs={pageEndCTAs}
          />
        ))}
      </StartPageStyles>
    </Layout>
  )
}

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
    margin-top: -91px;
    padding-top: 91px;
  }
  .reduce-pt {
    padding-top: 5vmax;
  }
  p {
    margin-bottom: 0.5rem;
  }
  @media (min-width: 640px) {
    .section#intro {
      padding-top: 30vh;
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
