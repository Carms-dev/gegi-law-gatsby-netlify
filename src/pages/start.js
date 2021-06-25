import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import QuestionSection from '../components/QuestionSection'
import { IconButton } from "@material-ui/core"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'


export default function GetStartedPage({ data: { page } }) {
  const { title, hero, questions, responseIcon } = page.childMarkdownRemark.frontmatter

  return (
    <Layout>
      <Seo title={title} />
        <StartPageStyles>
          <section className="section section-intro">
            <Hero heading={hero.heading} description={hero.description} image={hero.image} />
            <IconButton
              aria-label="move downward"
              href='#step-1'
              className="scroll-to"
            >
              <ArrowDownwardIcon size='medium'/>
            </IconButton>
            {/* <SectionIndicator></SectionIndicator> */}
          </section>
          {questions.map((section, index) => (
            <QuestionSection
              className="section"
              key={section.question}
              section={section}
              count={questions.length}
              responseIcon={responseIcon}
              index={index} />
          ))}
        </StartPageStyles>
    </Layout>
  )
}

const StartPageStyles = styled.div`
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .section-intro {
    min-height: calc(100vh - 91px);
  }
  .reduce-pt {
    padding-top: 5vmax;
  }
  .scroll-to {
    position: absolute;
    left: 50%;
    bottom: 3vmax;
    transform: translateX(-50%);
  }
  @media (min-width: 640px) {
    .section-intro {
      padding-top: 15vh;
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
        }
      }
    }
  }
`