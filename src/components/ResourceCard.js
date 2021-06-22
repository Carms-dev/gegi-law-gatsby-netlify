import * as React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import SimplePopover from "./SimplePopover"

export default function ResourceCard({ resource }) {
  const { 
    cost,
    eligibility,
    email,
    location,
    logo,
    highlights,
    resourceType,
    phone,
    resourceName,
    service,
    serviceDescription,
    website
  } = resource

  return (
    <ResourceCardStyles>
      <div className="card-img">
        <GatsbyImage
          image={logo.childImageSharp.gatsbyImageData}
          alt={`${resourceName} logo`}
          imgStyle={{width: `auto`}}
        />
      </div>
      <h3>{resourceName}</h3>
      <div className="btns-inline">
        {website && <a href={website} target="_blank" rel="noreferrer">Website</a>}
        {email && <a href={`mailto: ${email}`}>Email</a>}
      </div>
      <div style={{color: `var(--grey)`}}>{cost} · {resourceType}</div>
      <ul>
        {highlights && <li>Highlights: <span>{highlights}</span></li>}
        <li>Service: <span>{service}</span></li>
        {eligibility && <li>Eligibility: <span>{eligibility}</span></li>}
        <li>Location: <span>{location.join(', ')}</span></li>
        {phone && <li>Phone: <span>{phone}</span></li>}
      </ul>
      <SimplePopover label="See service description →" content={serviceDescription} />
    </ResourceCardStyles>
  )
}

const ResourceCardStyles = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;
  border: 1px solid var(--grey-light);
  border-radius: 12px;
  position: relative;


  .card-img {
    height: 200px;
    display: grid;
    place-content: center center;
  }
  /* may have to implement string truncate for line > 2 */
  h3 {
    font-weight: 500;
    min-height: 72px;
  }
  /* TODO: generalized */
  .btns-inline {
    margin-bottom: 1rem;
    > a {
      display: inline-block;
      padding: 0.5rem 0;
      margin-right: 0.5rem;
      background: var(--lighter);
      border: 1px solid var(--grey-light);
      min-width: 96px;
      text-align: center;
      border-radius: 8px;
      font-weight: 300;
    }
  }
  ul {
    list-style: none;
    padding: 1rem 0;
    border-top: 1px solid var(--grey-light);
    margin-top: 1rem;
  }
  li {
    font-weight: 500;
    padding: 0.25rem 0;
    span {
      font-weight: 300;
    }
  }
  /* fix the popover to the bottom */
  & > div:last-child {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
  }
`
