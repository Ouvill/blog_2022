import path from "path";
import { Reporter, Actions, CreatePagesArgs } from "gatsby";
import { genTagIndexSlug } from "../../src/utils/genSlug";
import { POSTS_PER_PAGE } from "./createBlogIndexPage";

export type TagIndexPageContext = {
  tag: string;
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
};

export const createTagIndexPage = async ({
  graphql,
  actions,
  reporter,
}: {
  graphql: CreatePagesArgs["graphql"];
  actions: Actions;
  reporter: Reporter;
}) => {
  const { createPage } = actions;

  const result = await graphql(`
    query CreateTagIndexPage {
      allMdx(
        limit: 1000
        filter: { fileAbsolutePath: { regex: "//blog//" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const tagTemplate = path.resolve(`src/templates/TagIndexTemplate.tsx`);

  // @ts-ignore
  const tags = result.data.allMdx.group;
  // @ts-ignore
  tags.forEach((tag) => {
    const numPages = Math.ceil(tag.totalCount / POSTS_PER_PAGE);
    if (!tag.fieldValue) return;
    for (let i = 0; i < numPages; i++) {
      const currentPage = i + 1;
      const context: TagIndexPageContext = {
        tag: tag.fieldValue,
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage,
      };

      createPage<TagIndexPageContext>({
        path: genTagIndexSlug(tag.fieldValue, currentPage),
        component: tagTemplate,
        context,
      });
    }
  });
};
