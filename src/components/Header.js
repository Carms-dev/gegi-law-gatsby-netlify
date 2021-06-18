import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Logo from "./Logo"


const Header = () => {
  const navLinks = [
    { title: `Resources`, path: `/resources` },
    { title: `Cases`, path: `/cases` },
  ]

  return (
    <>
      <Logo/>
      {navLinks.map(link => <Link to={link.path}>{link.title}</Link>)}
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
