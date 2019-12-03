const pathUtil = require('path');
const { updateStateAndRunQueries } = require('gatsby/dist/query/query-watcher');

exports.createPages = async ({ graphql, actions, traceId }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "data" } }) {
        edges {
          node {
            name
          }
        }
      }
    }
  `);
  result.data.allFile.edges.forEach(({ node }) => {
    if (node.name === 'skip') {
      return;
    }
    console.log(`creating page for ${node.name}`);
    const slug = `/${node.name}/`;
    createPage({
      path: slug,
      component: pathUtil.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: slug,
      },
    })
  });

  if (traceId === 'createPages') {
    await updateStateAndRunQueries(false, {});
  }
}
