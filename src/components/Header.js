import * as React from "react"
import PropTypes from "prop-types"
import { graphql, Link, useStaticQuery } from "gatsby"

import Logo from "./Logo"
import SideDrawer from "./SideDrawer"

import { AppBar, Toolbar } from "@material-ui/core"
import { List, ListItem, ListItemText, Container, Hidden } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  navbarDisplayFlex: {
    zIndex: 100,
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    padding: `1rem 0`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    color: `black`
  }
});

const Header = () => {
  const classes = useStyles();

  const { siteSettings } = useStaticQuery(graphql`
    query {
      siteSettings: file(relativeDirectory: {eq: "settings"}) {
        childMarkdownRemark {
          frontmatter {
            navigation {
              pagePath
              label
              icon {
                imageFile {
                  childImageSharp {
                    gatsbyImageData(
                      width: 50
                      placeholder: BLURRED
                      layout: CONSTRAINED
                    )
                  }
                }
                alt
              }
            }
          }
        }
      }
    }
  `)

  const { navigation } = siteSettings.childMarkdownRemark.frontmatter

  return (
    <AppBar position="static" style={{ background: `var(--aqua-light)`, boxShadow: `unset` }}>
      <Toolbar>
        <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
          <Logo />
          <Hidden smDown>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navigation.map(({ label, pagePath }) => (
                <Link to={pagePath} key={label} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={label} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Hidden>

          <Hidden mdUp>
            <SideDrawer navigation={navigation} />
          </Hidden>
        </Container>

      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
