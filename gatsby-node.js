const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` });
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`,
    });
  }
};

const createBlogIndexPage = async (actions, graphql) => {
  const { createPage } = actions;
  const blogIndexTemplate = require.resolve(
    `./src/templates/BlogIndexTemplate.tsx`
  );
  return graphql(`
    query CreateBlogIndexPage {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "//blog//" } }
      ) {
        totalCount
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const postsPerPage = 10;
    const numPages = Math.ceil(
      result.data.allMarkdownRemark.totalCount / postsPerPage
    );
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/indexes/${i + 1}`,
        component: blogIndexTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};

const createBlogPage = async (actions, graphql) => {
  const { createPage } = actions;
  const blogPostTemplate = require.resolve("./src/templates/BlogTemplate.tsx");
  return graphql(`
    query CreateBlogPage {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//blog//" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
          id: node.id,
        },
      });
    });
  });
};

exports.createPages = async ({ actions, graphql }) => {
  return Promise.all([
    createBlogPage(actions, graphql),
    createBlogIndexPage(actions, graphql),
  ]);
};
