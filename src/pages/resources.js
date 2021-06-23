import React, { useState } from 'react'
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { graphql } from 'gatsby'
import Hero from '../components/Hero'
import ResourceCards from '../components/ResourceCards'
import Filters from '../components/Filters'
import { cleanObject, stringToSlug } from '../utils/helpers'
import SiteBorderStyles from '../styles/SiteBorderStyles'

export default function ResourcesPage({ data: { page, collections } }) {
  const { title, hero, filters } = page.childMarkdownRemark.frontmatter

  // build filter
  const originalSelection = {}

  filters.forEach(filter => {
    originalSelection[filter] = ``
  })

  const [selection, setSelection] = useState(originalSelection)

  // create filter collections to pass as props
  const filterCollections = filters.map(filter => {
    const select = collections.group
    .find(collection => collection.fieldValue === filter)
    .nodes.map(node => (cleanObject(node.childMarkdownRemark.frontmatter)))

    const menuItems = select.map(item => ({
      label: item.category,
      value: stringToSlug(item.category)
    }))

    return {selectLabel: filter, menuItems: menuItems}
  })

  // build resources
  const allResources = collections.group
    .find(collection => collection.fieldValue === "resources")
    .nodes.map(node => (cleanObject(node.childMarkdownRemark.frontmatter)))

  const [resources, setResources] = useState(allResources)

  return (
    <Layout>
      <Seo title={title} />
      <section className="pb-section bg-aqua">
        <Hero heading={hero.heading} description={`${allResources.length} ${hero.description}`} image={hero.image} />
        <SiteBorderStyles>
          <Filters
            allResources={allResources}
            collections={filterCollections}
            selection={selection}
            setSelection={setSelection}
            setResources={setResources}
          />
        </SiteBorderStyles>
      </section>
      <div id="wave-container">
        <div id="wave" />
      </div>
      <section className="py-section">
        <SiteBorderStyles>
          <ResourceCards resources={resources} />
        </SiteBorderStyles>

      </section>
    </Layout>
  )
}

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "pages"}, name: {eq: "resources"}) {
      childMarkdownRemark {
        frontmatter {
          title
          hero {
            heading
            description
            image {
              alt
              imageFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 400
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
          }
          filters
        }
      }
    }
    collections: allFile(filter: {relativeDirectory: {in: ["resources", "service", "cost", "location"]}}) {
      group(field: relativeDirectory) {
        fieldValue
        nodes {
          childMarkdownRemark {
            frontmatter {
              category
              resourceName
              highlights
              eligibility
              service
              serviceDescription
              website
              email
              phone
              resourceType
              location
              cost
              logo {
                childImageSharp {
                  gatsbyImageData(
                    width: 280
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`
