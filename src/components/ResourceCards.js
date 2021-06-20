import * as React from "react"
import styled from "styled-components"
import ResourceCard from './ResourceCard'

export default function ResourceCards({ resources }) {
  return (
    <ResourceCardsStyles>
      {resources.map(res => (<ResourceCard key={res.resourceName} resource={res} />))}
    </ResourceCardsStyles>
  )
}

const ResourceCardsStyles = styled.section`
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
  grid-gap: 1rem;

  @media (min-width: 1024px) {
    /* grid-template-columns: repeat( auto-fit, minmax(320px, 1fr) ); */
    grid-template-columns: repeat(3, 1fr);

  }

`
