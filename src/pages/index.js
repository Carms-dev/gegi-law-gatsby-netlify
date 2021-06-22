import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SiteBorderStyles from "../styles/SiteBorderStyles"

export default function IndexPage() {
  return (
    <Layout>
      <Seo title="Home" />
      <SiteBorderStyles>
        <h1>Home</h1>
      </SiteBorderStyles>
    </Layout>
  )
}
