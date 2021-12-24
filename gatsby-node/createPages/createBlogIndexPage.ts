import path from "path";
import { Actions, CreatePagesArgs } from "gatsby";

export const createBlogIndexPage = async ({
  actions,
  graphql,
}: {
  actions: Actions;
  graphql: CreatePagesArgs["graphql"];
}) => {
  const { createPage } = actions;
  const blogIndexTemplate = path.resolve(`src/templates/BlogIndexTemplate.tsx`);
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
      // @ts-ignore
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
