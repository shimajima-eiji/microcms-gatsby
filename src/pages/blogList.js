// microCMSとの連携だけを確認する
// https://qiita.com/aokisinn1192/items/12af80097a7e388a8210
import React from "react"
import { graphql, Link } from "gatsby"

export default ( { data } ) =>
{
  return ( <>
    <h1>blogList</h1>
    <ul className="blog_list">
      { data.allMicrocmsMain.edges.map( ( { node } ) =>
      {
        return (
          <li><Link to={ `/${node.mainId}` }>{ node.title }</Link></li>
        );
      } ) }
    </ul>
  </>
  )
}

export const query = graphql`
query {
    allMicrocmsMain {
        edges {
            node {
                mainId
                title
            }
        }
    }
  }
`;
