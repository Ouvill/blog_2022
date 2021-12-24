import path from "path";
import { Reporter, Actions, CreatePagesArgs } from "gatsby";
import _ from "lodash";
import { CreateTagIndexPageQuery } from "../../graphql-types";

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

  const result = await graphql<CreateTagIndexPageQuery>(`
    query CreateTagIndexPage {
      allMarkdownRemark(
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

  const postsPerPage = 10;
  const tagTemplate = path.resolve(`src/templates/TagIndexTemplate.tsx`);

  const tags = result.data.allMarkdownRemark.group;
  tags.forEach((tag) => {
    const numPages = Math.ceil(tag.totalCount / postsPerPage);
    if (!tag.fieldValue) return;
    for (let i = 0; i < numPages; i++) {
      const currentPage = i + 1;
      const context: TagIndexPageContext = {
        tag: tag.fieldValue,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage,
      };

      createPage<TagIndexPageContext>({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/${currentPage}`,
        component: tagTemplate,
        context,
      });
    }
  });
};
