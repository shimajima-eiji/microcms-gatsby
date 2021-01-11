import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


export default ( { data } ) =>
{
  return (
    <Layout>
      <SEO title="Home" />
      { data.allMicrocmsMain.edges.map( ( { node } ) =>
      {
        return (
          <article className={ "blog_list " + node.mainId }>
            <h3><Link to={ "/" + node.mainId }>{ node.title }</Link></h3>
            <div>{ node.publishedAt }</div>
            <div>{ node.body.substr( 0, 100 ) }......</div>
            <div><Link to={ "/" + node.mainId }>続きを読む</Link></div>
          </article>
        );
      } ) }
    </Layout>
  )
}

export const query = graphql`
query {
    allMicrocmsMain (sort: {order: DESC, fields: publishedAt}) {
        edges {
            node {
                mainId
                title
                body
                publishedAt(formatString: "YYYY年MM月DD日")
            }
        }
    }
  }
`;
