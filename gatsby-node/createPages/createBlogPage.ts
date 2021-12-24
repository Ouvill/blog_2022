import path from "path";
import { Actions, CreatePagesArgs } from "gatsby";

export const createBlogPage = async ({
  actions,
  graphql,
}: {
  actions: Actions;
  graphql: CreatePagesArgs["graphql"];
}) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve("src/templates/BlogTemplate.tsx");
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
    // @ts-ignore
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
