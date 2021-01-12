import React from "react"
import { Link, graphql } from "gatsby"
import striptags from "striptags"
import { StaticImage } from "gatsby-plugin-image"  // FYI: https://ebisu.com/note/new-gatsby-image/

import Layout from "../components/layout"
import SEO from "../components/seo"
import Share from "../components/share"
import Style from "./index.module.css"

function sumarrize ( html )
{
  const metaDescription = striptags( html ).replace( /\r?\n/g, '' ).trim();
  return metaDescription.length <= 120
    ? metaDescription
    : metaDescription.slice( 0, 120 ) + '......';
}

export default ( { data } ) =>
{
  return (
    <Layout>
      <SEO title="記事一覧" />
      <aside className={ Style.profile }>
        <div className={ Style.profile_image }>
          <h1>Author</h1>
          <StaticImage
            src="../images/author.png"
            layout="fluid"
            style={ { width: "128px", height: "128px" } }
            alt=""
          />
          <Share
            title={ "#" + data.site.siteMetadata.title }
            url={ data.site.siteMetadata.url }
          />
        </div>
        <div className={ Style.profile_description }>
          <span>
            { data.site.siteMetadata.description }
          </span>
        </div>
      </aside>
      <section className={ Style.container }>
        <h1 className={ Style.information }>記事は最新が上に来ます</h1>
        { data.allMicrocmsMain.nodes.map( node =>
        {
          return (
            <article className={ Style.blog_list + " " + node.mainId }>
              <h3><Link to={ "/" + node.mainId }>{ node.title }</Link>　<span>最終更新:{ node.updatedAt }（初公開:{ node.publishedAt }）</span></h3>
              <div>{ ( node.description !== "0" ) ? node.description : sumarrize( node.body ) }</div>
              <div><Link to={ "/" + node.mainId }>続きを読む</Link></div>
            </article>
          );
        } ) }
      </section>
    </Layout >
  )
}

export const query = graphql`
query {
  site {
    siteMetadata {
      author
      description
      url
      title
    }
  }
  allMicrocmsMain (sort: {order: DESC, fields: publishedAt}) {
    nodes {
      mainId
      title
      body
      updatedAt(formatString: "YYYY/M/D HH:mm:SS")
      publishedAt(formatString: "YYYY/M/D HH:mm:SS")
    }
  }
}
`;
