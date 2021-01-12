import React from "react"
import urlJoin from "url-join"
import marked from "marked"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PAGINATION from "../components/pagination"
import Share from "../components/share"

import Style from "./blog-post.module.css"

export default ( { pageContext } ) =>
{
  const { title, description, body, picturl, mainId, updatedAt, publishedAt, tags } = pageContext.post
  const sns_title = title + " #" + pageContext.site.title
  const url = urlJoin( pageContext.site.url, mainId )
  return (
    <Layout>
      <SEO title={ title }
        description={ description }
        image={ picturl }
      />
      <article className={ Style.container }>
        <h1>{ title }</h1>
        <p><span>最終更新:{ updatedAt }（初公開:{ publishedAt }）</span></p>
        <Share
          title={ sns_title }
          url={ url }
        />
        <section className={ Style.contents } dangerouslySetInnerHTML={ { __html: marked( body ) } } />
        <Share
          title={ sns_title }
          url={ url }
        />
        <nav>
          <h1>関連ワード</h1>
          { tags }
        </nav>
      </article>
      <PAGINATION prev={ pageContext.prev } next={ pageContext.next }></PAGINATION>
    </Layout>
  )
}
