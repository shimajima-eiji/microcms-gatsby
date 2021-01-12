const path = require( "path" )
const striptags = require( "striptags" )

function sumarrize ( html )
{
  const metaDescription = striptags( html ).replace( /\r?\n/g, '' ).trim();
  return metaDescription.length <= 120
    ? metaDescription
    : metaDescription.slice( 0, 120 ) + '...';
}

exports.createPages = async ( { graphql, actions } ) =>
{
  const { createPage } = actions;

  const result = await graphql(
    `
    {
      site {
        siteMetadata {
          title
          url
        }
      }
      allMicrocmsMain (sort: {order: DESC, fields: publishedAt}) {
        edges {
          node {
            mainId
            body
            title
            updatedAt(formatString: "YYYY年MM月DD日 HH時mm分SS秒")
            publishedAt(formatString: "YYYY年MM月DD日 HH時mm分SS秒")
          }
        }
      }
    }
    `
  );

  if ( result.errors )
  {
    throw result.errors;
  }

  const pages = result.data.allMicrocmsMain.edges;
  pages.forEach( ( post, index ) =>
  {
    const next = index === 0 ? null : pages[ index - 1 ].node
    const prev = index === pages.length - 1 ? null : pages[ index + 1 ].node
    if ( !post.node.description ) post.node.description = sumarrize( post.node.body )
    createPage( {
      path: post.node.mainId,
      component: path.resolve( './src/templates/blog-post.js' ),
      context: {
        slug: index,
        post: post.node,
        prev,
        next,
        site: result.data.site.siteMetadata,
      },
    } );
  } );
};
