import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Logo() {
  const { siteSettings } = useStaticQuery(graphql`
    query {
      siteSettings: file(relativeDirectory: {eq: "settings"}) {
        childrenMarkdownRemark {
          frontmatter {
            siteTitle
            siteLogo {
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
  `)

  const { siteTitle, siteLogo } = siteSettings.childrenMarkdownRemark[0].frontmatter
  return (
    <Link to='/'>
      <GatsbyImage
        image={siteLogo?.childImageSharp.gatsbyImageData}
        alt={`${siteTitle} logo`}
        imgStyle={{width: `auto`}}
      />
    </Link>
  )
}
