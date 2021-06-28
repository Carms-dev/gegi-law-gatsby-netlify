import React from 'react'
import { ResourcesSelect } from '../components/SimpleSelect'
import styled from 'styled-components'

export default function Filters({ allResources, setResources, selection, setSelection, collections }) {
  return (
    <FiltersStyles>
      {collections.map(collection => (
        <ResourcesSelect
          allResources={allResources}
          setResources={setResources}
          selection={selection}
          setSelection={setSelection}
          key={collection.selectLabel}
          selectLabel={collection.selectLabel}
          menuItems={collection.menuItems}
        />
      ))}
    </FiltersStyles>
  )
}

const FiltersStyles = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding-top: 2rem;
  max-width: 450px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    max-width: 840px;
    grid-template-columns: repeat(3, 1fr);
    padding-top: 0;
  }

`
