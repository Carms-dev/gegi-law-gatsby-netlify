import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import GlobalStyles from "../styles/GlobalStyles"
import SiteBorderStyles from "../styles/SiteBorderStyles"
import Header from "./Header"
import Footer from "./Footer"
import Typography from "../styles/Typography"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyles />
      <Typography />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <SiteBorderStyles>
        <main>{children}</main>
      </SiteBorderStyles>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
