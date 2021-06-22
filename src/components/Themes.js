import React, { useState } from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    padding: `1rem 0`,
    fontFamily: `inherit`,
    fontSize: `inherit`,
  },
  chip: {
    margin: 4,
    flexDirection: `row-reverse`,
    "& .MuiAvatar-root": {
      marginLeft: 0,
      marginRight: 4,
    }
  }
}));

export default function Themes({themes, allCases, setCases}) {
  const classes = useStyles();

  const casesGroupByThemes = themes
  .map(theme => ({
    theme: theme.category,
    cases: allCases.filter(cas => cas.themes.includes(theme.category))
  }))
  .sort((a, b) => b.cases.length - a.cases.length)

  // Add `All` filter as the first group in the array
  casesGroupByThemes.unshift({
    theme: `All`,
    cases: allCases
  })

  // default active theme to be `All`
  const [activeTheme, setActiveTheme] = useState(`All`)

  const handleClick = (event) => {
    const targetedTheme = event.currentTarget.getAttribute("name")

    // update activeTheme
    setActiveTheme(targetedTheme)

    // update the cases rendered
    const updatedCases = casesGroupByThemes.find(group => targetedTheme === group.theme).cases
    setCases(updatedCases)
  }

  return (
    <div className={classes.root}>
      {casesGroupByThemes.map(({ theme, cases }) => (
        <Chip
          name={theme}
          variant="outlined"
          size="medium"
          color={activeTheme === theme ? 'primary' : ''}
          avatar={<Avatar>{cases.length}</Avatar>}
          label={theme}
          onClick={handleClick}
          className={classes.chip}
        />
      ))}
    </div>
  )
}
