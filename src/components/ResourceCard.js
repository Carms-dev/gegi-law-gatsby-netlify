import * as React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import SimplePopover from "./SimplePopover"

export default function ResourceCard({ resource }) {
  const { 
    cost,
    eligibility,
    email,
    locations,
    logo,
    resourceType,
    phone,
    resourceName,
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
      <div>
        {website && <a className="btn btn-secondary" href={website} target="_blank" rel="noreferrer">Website</a>}
        {email && <a className="btn btn-secondary" href={`mailto: ${email}`}>Email</a>}
      </div>
      <div style={{color: `var(--grey)`}}>{cost} · {resourceType}</div>
      <ul>
        {/* <li>Hightlights: <span></span></li> */}
        {/* <li>Services: <span></span></li> */}
        {eligibility && <li>Eligibility: <span>{eligibility}</span></li>}
        <li>Location: <span>{locations.join(', ')}</span></li>
        {phone && <li>Phone: <span>{phone}</span></li>}
      </ul>
      <SimplePopover label="See service description →" content={serviceDescription} />
    </ResourceCardStyles>
  )
}

const ResourceCardStyles = styled.div`
  padding: 1rem;
  border: 1px solid var(--grey-light);
  border-radius: 12px;

  .card-img {
    height: 200px;
    display: grid;
    place-content: center center;
  }

  .btn-secondary {
    padding: 1rem 2rem;
  }

  h3 {
    font-weight: 500;
  }
  
  ul {
    list-style: none;
    padding: 0.5rem 0;
    border-top: 1px solid var(--grey-light);
    margin-top: 0.5 rem;
  }
  li {
    font-weight: 500;
    padding: 0.25rem 0;
    span {
      font-weight: 300;
    }
  }

`
