import path from "path";
import { Actions, CreatePagesArgs } from "gatsby";
import { MarkdownRemarkFields } from "../../graphql-types";

type Node = {
  id: string;
  fields: MarkdownRemarkFields;
};

export type BlogPageContext = {
  slug: string;
  id: string;
  next: Node | null;
  prev: Node | null;
};

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
    if (result.errors || !result.data) {
      return Promise.reject(result.errors);
    }

    // @ts-ignore
    const { edges } = result.data.allMarkdownRemark;
    // @ts-ignore
    edges.forEach(({ node }, index) => {
      const next: Node = index === 0 ? null : edges[index - 1].node;
      const prev: Node =
        index === edges.length - 1 ? null : edges[index + 1].node;

      createPage<BlogPageContext>({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
          id: node.id,
          next,
          prev,
        },
      });
    });
  });
};
