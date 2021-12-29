import path from "path";
import { Actions, CreatePagesArgs } from "gatsby";
import { genCategoryIndexSlug } from "../../src/utils/genSlug";
import { POSTS_PER_PAGE } from "./createBlogIndexPage";

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
  return graphql(`
    query CreateCategoryIndexPage {
      allMdx(
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
    // @ts-ignore
    result.data.allMdx.group.forEach((category) => {
      const numPages = Math.ceil(category.totalCount / POSTS_PER_PAGE);
      if (!category.fieldValue) return;
      for (let i = 0; i < numPages; i++) {
        const currentPage = i + 1;
        const context: CategoryIndexContext = {
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
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
