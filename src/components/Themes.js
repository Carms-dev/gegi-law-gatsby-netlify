import React from 'react'
import styled from 'styled-components'

export default function Themes({themes}) {
  return (
    <ThemesStyles>
      {themes.map(theme => (
        <h4>{theme.category}</h4>
      ))}
    </ThemesStyles>
  )
}

const ThemesStyles = styled.div`

  @media (min-width: 1024px) {
  }

`