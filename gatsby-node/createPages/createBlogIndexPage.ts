import path from "path";
import { Actions, CreatePagesArgs } from "gatsby";
import { genBlogIndexSlug } from "../../src/utils/genSlug";

export type BlogIndexPageContext = {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
};

export const POSTS_PER_PAGE = 12;

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
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "//blog//" } }
      ) {
        totalCount
      }
    }
  `).then((result) => {
    if (result.errors || !result.data) {
      return Promise.reject(result.errors);
    }

    // @ts-ignore
    const numPages = Math.ceil(result.data.allMdx.totalCount / POSTS_PER_PAGE);
    Array.from({ length: numPages }).forEach((_, i) => {
      const currentPage = i + 1;
      createPage<BlogIndexPageContext>({
        path: genBlogIndexSlug(currentPage),
        component: blogIndexTemplate,
        context: {
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
          numPages,
          currentPage,
        },
      });
    });
  });
};
