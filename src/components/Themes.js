import React from 'react'
import styled from 'styled-components'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

export default function Themes({themes, allCases, setCases}) {
  const casesGroupByThemes = themes
    .map(theme => ({
      theme: theme.category,
      cases: allCases.filter(cas => cas.themes.includes(theme.category))
    }))
    .sort((a, b) => b.cases.length - a.cases.length)

    // Add All to the begining of the group
    casesGroupByThemes.unshift({
      theme: `All`,
      cases: allCases
    })

  console.log(casesGroupByThemes)

  const handleClick = (event) => {
    const targetedTheme = event.currentTarget.getAttribute("name")
    const updatedCases = casesGroupByThemes.find(group => targetedTheme === group.theme).cases
    setCases(updatedCases)
  }

  return (
    <ThemesStyles>
      {casesGroupByThemes.map(({ theme, cases }) => (
        <Chip
          name={theme}
          variant="outlined"
          size="medium"
          avatar={<Avatar>{cases.length}</Avatar>}
          label={theme}
          onClick={handleClick}
        />
      ))}
    </ThemesStyles>
  )
}

const ThemesStyles = styled.div`

  @media (min-width: 1024px) {
  }

`