import { CreateNodeArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

export const createSlug = (args: CreateNodeArgs) => {
  const { node, getNode, actions } = args;
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` });
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`,
    });
  }
};
