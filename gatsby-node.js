const path = require( "path" )
exports.createPages = async ( { graphql, actions } ) =>
{
  const { createPage } = actions;

  const result = await graphql(
    `
    {
      site {
        siteMetadata {
          title
        }
      }
      allMicrocmsMain {
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

  result.data.allMicrocmsMain.edges.forEach( ( post, index ) =>
  {
    createPage( {
      path: post.node.mainId,
      component: path.resolve( './src/templates/blog-post.js' ),
      context: {
        post: post.node,
      },
    } );
  } );
};
