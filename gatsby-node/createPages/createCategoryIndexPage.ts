import path from "path";
import { Actions, CreatePagesArgs } from "gatsby";

export const createCategoryIndexPage = async ({
  actions,
  graphql,
}: {
  actions: Actions;
  graphql: CreatePagesArgs["graphql"];
}) => {
  const { createPage } = actions;
  const categoryIndexTemplate = path.resolve(
    `src/templates/CategoryIndexTemplate.tsx`
  );
  console.log("createCategoryIndexPage");
  return graphql(`
    query CreateCategoryIndexPage {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//blog//" } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const postsPerPage = 10;
    // @ts-ignore
    result.data.allMarkdownRemark.group.forEach((category) => {
      const numPages = Math.ceil(category.totalCount / postsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/categories/${category.fieldValue}/${i + 1}`,
          component: categoryIndexTemplate,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            category: category.fieldValue,
          },
        });
      });
    });
  });
};
