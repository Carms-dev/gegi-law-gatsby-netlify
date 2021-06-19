import React from "react"
import SimpleSelect from '../components/SimpleSelect'
import styled from 'styled-components'

export default function Filters() {
  return (
    <FiltersStyles>
      <SimpleSelect />
      <SimpleSelect />
      <SimpleSelect />   
    </FiltersStyles>
  )
}

const FiltersStyles = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 2rem 0;
  max-width: 540px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    max-width: 840px;
    grid-template-columns: repeat(3, 1fr);
  }

`