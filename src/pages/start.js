import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import QuestionSection from '../components/QuestionSection'
import { IconButton } from "@material-ui/core"
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

export default function GetStartedPage({ data: { page } }) {
  const { title, hero, questions } = page.childMarkdownRemark.frontmatter

  const [step, setStep] = useState(0)

  const handleClick = () => {
    setStep(step + 1)
    let pageHeight = window.innerHeight;
    window.scrollBy(0, pageHeight);
  }

  return (
    <Layout>
      <Seo title={title} />
        <StartPageStyles>
          <section style={{height: `calc(100vh - 91px)`}}>
            <Hero heading={hero.heading} description={hero.description} image={hero.image} />
          </section>
          {questions.map((section, index) => (
            <QuestionSection
              key={section.question}
              section={section}
              index={index}
            />
          ))}
          <IconButton
            onClick={handleClick}
            color="primary"
            aria-label="move downward"
            style={{
              display: `${step > 3 ? 'none' : 'block'}`,
              position: `fixed`,
              left: `50vw`,
              bottom: `5vh`,
              transform: `translateX(-50%)` 
            }}
          >
            <ArrowDownwardIcon size='medium' />
          </IconButton>
        </StartPageStyles>
    </Layout>
  )
}

const StartPageStyles = styled.div`
  
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