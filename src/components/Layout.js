import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import GlobalStyles from '../styles/GlobalStyles'
import Header from './Header'
import Footer from './Footer'
import Typography from '../styles/Typography'

const Layout = ({ children, pausedRef}) => {
  const { siteSettings } = useStaticQuery(graphql`
    query SiteTitleQuery {
      siteSettings: file(relativeDirectory: {eq: "settings"}) {
        childrenMarkdownRemark {
          frontmatter {
            siteTitle
          }
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyles />
      <Typography />
      <Header siteTitle={siteSettings.childrenMarkdownRemark.frontmatter?.siteTitle || `Title`} />
      <main>{children}</main>
      <Footer pausedRef={pausedRef}/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
