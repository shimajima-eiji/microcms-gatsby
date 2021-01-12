import React from "react"
import urlJoin from "url-join"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PAGINATION from "../components/pagination"
import Share from "../components/share"

import Style from "./blog-post.module.css"

export default ( { pageContext } ) =>
{
  const { title, description, body, img, mainId, updatedAt, publishedAt } = pageContext.post
  const sns_title = title + " #" + pageContext.site.title
  const url = urlJoin( pageContext.site.url, mainId )
  return (
    <Layout>
      <SEO title={ title }
        description={ description || body }
        image={ img }
      />
      <article className={ Style.container }>
        <h1>{ title }</h1>
        <p><span>最終更新:{ updatedAt }（初公開:{ publishedAt }）</span></p>
        <Share
          title={ sns_title }
          url={ url }
        />
        <div dangerouslySetInnerHTML={ { __html: body } } />
        <Share
          title={ sns_title }
          url={ url }
        />
      </article>
      <PAGINATION prev={ pageContext.prev } next={ pageContext.next }></PAGINATION>
    </Layout>
  )
}
