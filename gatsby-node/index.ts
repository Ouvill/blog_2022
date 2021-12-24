import { GatsbyNode } from "gatsby";
import { createBlogIndexPage } from "./createPages/createBlogIndexPage";
import { createBlogPage } from "./createPages/createBlogPage";
import { createCategoryIndexPage } from "./createPages/createCategoryIndexPage";
import { createSlug } from "./onCreateNode/createSlug";
import { createTagIndexPage } from "./createPages/createTagsPage";

export const onCreateNode: GatsbyNode["onCreateNode"] = (args) => {
  createSlug(args);
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  await Promise.all([
    createBlogPage({ actions, graphql }),
    createBlogIndexPage({ actions, graphql }),
    createCategoryIndexPage({ actions, graphql }),
    createTagIndexPage({ actions, graphql, reporter }),
  ]);
};
