import path from "path";
import { Actions, CreatePagesArgs, Reporter } from "gatsby";
import { CreateBlogPageQuery } from "../../graphql-types";

export type BlogPageContext = {
  slug: string;
  id: string;
  nextId?: string;
  prevId?: string;
};

export const createBlogPage = async ({
  actions,
  graphql,
  reporter,
}: {
  actions: Actions;
  graphql: CreatePagesArgs["graphql"];
  reporter: Reporter;
}) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve("src/templates/BlogTemplate.tsx");
  return graphql<CreateBlogPageQuery>(`
    query CreateBlogPage {
      allMdx(
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
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }

    const { edges } = result.data.allMdx;
    // @ts-ignore
    edges.forEach(({ node }, index) => {
      if (!node.fields?.slug) {
        return;
      }

      const next = index === 0 ? null : edges[index - 1].node;
      const prev = index === edges.length - 1 ? null : edges[index + 1].node;

      createPage<BlogPageContext>({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
          id: node.id,
          nextId: next?.id,
          prevId: prev?.id,
        },
      });
    });
  });
};
