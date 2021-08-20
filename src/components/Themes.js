import React from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { stringToSlug } from '../utils/helpers';

const useStyles = makeStyles(() => ({
  chip: {
    borderRadius: 8,
    margin: 4,
    flexDirection: `row-reverse`,
    "&.MuiChip-outlinedPrimary": {
      color: `var(--aqua-dark)`,
      border: `1px solid var(--aqua-dark)`,
    },
    "& .MuiAvatar-root": {
      marginLeft: 0,
      marginRight: 4,
      borderRadius: 8,
    },
    "& .MuiChip-avatarColorPrimary": {
      backgroundColor: `var(--aqua-dark)`,
    }
  }
}));

export default function Themes({ allCases, setCases, province, allThemes, theme, setTheme }) {
  const classes = useStyles();

  const casesGroupByThemes = allThemes
  .map(theme => ({
    title: theme.category,
    cases: allCases
      .filter(cas => stringToSlug(cas.province) === province)
      .filter(cas => cas.themes.includes(theme.category))
  }))
  .sort((a, b) => b.cases.length - a.cases.length)

  // Add `All` filter as the first group in the array
  casesGroupByThemes.unshift({
    title: `All`,
    cases: allCases.filter(cas => stringToSlug(cas.province) === province)
  })

  // default active theme to be `All`

  const handleClick = (event) => {
    const updatedTheme = event.currentTarget.getAttribute("name")

    // update activeTheme
    setTheme(updatedTheme)

    // update the cases rendered
    const updatedCases = allCases
      .filter(cas => {
        const matchProv = stringToSlug(cas.province) === province
        const matchTheme = updatedTheme === "All" ? true : cas.themes.includes(updatedTheme)

        return matchProv && matchTheme
      })

    setCases(updatedCases)
  }

  return (
    <div>
      {casesGroupByThemes.map(({ title, cases }) => (
        <Chip
          key={title}
          name={title}
          variant="outlined"
          size="medium"
          color={theme === title ? 'primary' : 'default'}
          avatar={<Avatar>{cases.length}</Avatar>}
          label={title}
          onClick={handleClick}
          className={classes.chip}
        />
      ))}
    </div>
  )
}
