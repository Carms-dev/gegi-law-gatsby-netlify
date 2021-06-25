import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
// import QuestionSection from '../components/QuestionSection'
import { IconButton } from "@material-ui/core"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { QuestionsSelect } from '../components/SimpleSelect'


export default function GetStartedPage({ data: { page } }) {
  const { title, hero, questions } = page.childMarkdownRemark.frontmatter

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
            <section id={`step-${index + 1}`} className="section section-100">
              <h3>{section.question}</h3>
              {section.description && <p>{section.description}</p>}
              <QuestionsSelect
                selectLabel={section.selectLabel}
                options={section.options}
              />
              {(index !== questions.length - 1) &&
                <IconButton
                  aria-label="move downward"
                  href={`#step-${index + 2}`}
                  className="scroll-to"
                >
                  <ArrowDownwardIcon size='medium'/>
                </IconButton>
              }
            </section>
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
  .section-100 {
    min-height: 100vh;
    padding: 20px;
    max-width: 800px;
    text-align: center;
    margin: auto;
    > * {
      margin-top: 1rem;
    }
    h3 {
      font-weight: 500;
    }
  }
  .scroll-to {
    position: absolute;
    left: 50%;
    bottom: 3vh;
    transform: translateX(-50%);
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