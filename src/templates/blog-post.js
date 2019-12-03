import React from "react"
import { graphql } from "gatsby"

export default ({ data }) => <h1>hey from {data.sitePage.path}</h1>

export const query = graphql`
  query($slug: String!) {
    sitePage(path: { eq: $slug }) {
      component
      path
    }
  }
`