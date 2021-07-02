import React, { useState } from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'

import { IconButton, Drawer, List, ListItem, ListItemText } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  linkText: {
    textDecoration: `none`,
    color: `black`,
  },
})

export default function SideDrawer({ navigation }) {
  const classes = useStyles();

  const [state, setState] = useState({ top: false })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setState({ [anchor]: open })
  }

  const sideDrawerList = anchor => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        {navigation.map(({ pagePath, label, icon }) => (
          <Link to={pagePath} key={label} className={classes.linkText}>
            <ListItem button>
              <GatsbyImage
                image={icon.imageFile.childImageSharp.gatsbyImageData}
                alt={icon.alt}
                imgStyle={{ width: `auto`}}
                style={{ marginRight: `0.5rem` }}/>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer("top", true)}
      >
        <Menu fontSize="large" />
      </IconButton>
      <Drawer
        anchor="top"
        open={state.top}
        onClose={toggleDrawer("top", false)}
      >
        {sideDrawerList("top")}
      </Drawer>
    </>
  )
}
