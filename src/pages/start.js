import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SiteBorderStyles from "../styles/SiteBorderStyles"

export default function GetStartedPage() {
  return (
    <Layout>
      <Seo title="Get Started" />
      <SiteBorderStyles>
        <h1>Start</h1>
      </SiteBorderStyles>
    </Layout>
  )
}

