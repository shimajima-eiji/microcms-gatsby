const path = require( "path" )
exports.createPages = async ( { graphql, actions } ) =>
{
  const { createPage } = actions;

  const result = await graphql(
    `
    {
      allMicrocmsMain (sort: {order: DESC, fields: publishedAt}) {
        edges {
          node {
            mainId
            body
            title
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
    createPage( {
      path: post.node.mainId,
      component: path.resolve( './src/templates/blog-post.js' ),
      context: {
        slug: index,
        post: post.node,
        prev,
        next,
      },
    } );
  } );
};
