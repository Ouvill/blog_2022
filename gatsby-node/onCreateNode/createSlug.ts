import { CreateNodeArgs } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

export const createSlug = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });

    console.log("createSlug", value);
    // Extend another node. The new node field is placed under the 'fields' key on the extended node object.
    createNodeField({
      // Name of the field adding
      name: "slug",
      // Individual MDX node
      node,
      // Generated value based on filepath.
      value: `/blog${value}`,
    });
  }
};
