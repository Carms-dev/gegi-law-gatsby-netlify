import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import ogImage from "../assets/images/og-image.png"

function Seo({ description, lang, meta, title }) {
  const { site, siteSettings } = useStaticQuery(graphql`
    query {
      siteSettings: file(relativeDirectory: {eq: "settings"}) {
        childrenMarkdownRemark {
          frontmatter {
            siteTitle
            siteDescription
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
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  const metaDescription = description || siteSettings.childrenMarkdownRemark[0]?.frontmatter?.siteDescription
  const defaultTitle = siteSettings.childrenMarkdownRemark[0]?.frontmatter?.siteTitle

  return (
    <Helmet
      defer={false}
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteUrl}${ogImage}`,
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteSettings.childrenMarkdownRemark[0].frontmatter?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
