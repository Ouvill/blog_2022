import path from "path";
import { Actions, CreatePagesArgs } from "gatsby";
import { CreateCategoryIndexPageQuery } from "../../graphql-types";
import { genCategoryIndexSlug } from "../../src/utils/genSlug";

export type CategoryIndexContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
  category: string;
};

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
  return graphql<CreateCategoryIndexPageQuery>(`
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
    if (result.errors || !result.data) {
      return Promise.reject(result.errors);
    }
    const postsPerPage = 10;
    result.data.allMarkdownRemark.group.forEach((category) => {
      const numPages = Math.ceil(category.totalCount / postsPerPage);
      if (!category.fieldValue) return;
      for (let i = 0; i < numPages; i++) {
        const currentPage = i + 1;
        const context: CategoryIndexContext = {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage,
          category: category.fieldValue,
        };
        createPage<CategoryIndexContext>({
          path: genCategoryIndexSlug(category.fieldValue, currentPage),
          component: categoryIndexTemplate,
          context,
        });
      }
    });
  });
};
