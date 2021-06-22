import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Logo from "./Logo"
import SideDrawer from "./SideDrawer"

import { AppBar, Toolbar } from "@material-ui/core"
import { IconButton, List, ListItem, ListItemText, Container, Hidden } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`
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

  const navLinks = [
    { title: `Get Started`, path: `/start` },
    { title: `Resources`, path: `/resources` },
    { title: `Cases`, path: `/cases` },
  ]

  return (
    <AppBar position="static" style={{ background: `var(--aqua-light)`, boxShadow: `unset` }}>
      <Toolbar>
        <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <Logo />
          </IconButton>
          <Hidden mdDown>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <Link to={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Hidden>

          <Hidden lgUp>
            <SideDrawer navLinks={navLinks} />
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
