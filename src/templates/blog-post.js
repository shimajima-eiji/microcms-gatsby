import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PAGINATION from "../components/pagination"

export default ( { pageContext } ) =>
{
  const { title, body } = pageContext.post;
  return (
    <Layout>
      <SEO title="Home"></SEO>
      <article>
        <h1>{ title }</h1>
        <div dangerouslySetInnerHTML={ { __html: body } } />
      </article>
      <PAGINATION prev={ pageContext.prev } next={ pageContext.next }></PAGINATION>
    </Layout>
  )
}
