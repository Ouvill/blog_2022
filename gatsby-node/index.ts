import { GatsbyNode } from "gatsby";
import { createBlogIndexPage } from "./createPages/createBlogIndexPage";
import { createBlogPage } from "./createPages/createBlogPage";
import { createCategoryIndexPage } from "./createPages/createCategoryIndexPage";
import { createSlug } from "./onCreateNode/createSlug";

export const onCreateNode: GatsbyNode["onCreateNode"] = (args) => {
  createSlug(args);
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  await Promise.all([
    createBlogPage({ actions, graphql }),
    createBlogIndexPage({ actions, graphql }),
    createCategoryIndexPage({ actions, graphql }),
  ]);
};
