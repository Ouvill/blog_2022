const createBlogPage = async (actions, graphql) => {
  const {createPage} = actions;
  const blogPostTemplate = require.resolve('./src/templates/BlogTemplate.tsx');
  return graphql(`
    query CreateBlogPage {
    allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "//blog//"}}
        sort: {order: DESC, fields: [frontmatter___date]}
        limit: 1000
    ) {
        edges {
            node {
                id
                frontmatter {
                    slug
                }
            }
        }
    }
}`).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: '/blog/' + node.frontmatter.slug,
        component: blogPostTemplate,
        context: {
          slug: node.frontmatter.slug,
          id: node.id
        },
      });
    });
  });
}


exports.createPages = async ({actions, graphql})  => {
  return Promise.all([
    createBlogPage(actions, graphql),
  ]);
};
