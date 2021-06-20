// import React from 'react'
import React, { useState } from 'react'
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { graphql } from 'gatsby'
import Hero from '../components/Hero'
import ResourceCards from '../components/ResourceCards'
import Filters from '../components/Filters'
import { cleanObject, stringToSlug } from '../utils/helpers'

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
      <Hero heading={hero.heading} description={`${resources.length} ${hero.description}`} image={hero.image} />
      <Filters
        allResources={allResources}
        collections={filterCollections}
        selection={selection}
        setSelection={setSelection}
        setResources={setResources}
      />
      <ResourceCards resources={resources} />
    </Layout>
  )
}

export const data = graphql`
  query {
    page: file(relativeDirectory: {eq: "pages"}, name: {eq: "resources-page"}) {
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
