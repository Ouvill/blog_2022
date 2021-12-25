import _ from "lodash";

export const genBlogIndexSlug = (currentPage: number = 1) => {
  return currentPage === 1 ? "/" : `/indexes/${currentPage}`;
};

export const genCategoryIndexSlug = (
  category: string,
  currentPage: number = 1
) => `/category/${_.snakeCase(category)}/${currentPage}`;

export const genTagIndexSlug = (tag: string, currentPage: number = 1) =>
  `/tag/${_.snakeCase(tag)}/${currentPage}`;
