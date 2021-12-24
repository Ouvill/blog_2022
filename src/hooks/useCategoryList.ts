import { graphql, useStaticQuery } from "gatsby";
import { UseCategoryListQuery } from "../../graphql-types";
import { genCategoryIndexSlug } from "../utils/genSlug";

const useCategoryList = () => {
  const data = useStaticQuery<UseCategoryListQuery>(graphql`
    query UseCategoryList {
      allMarkdownRemark {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return data.allMarkdownRemark.group.flatMap((item) =>
    item.fieldValue
      ? [
          {
            name: item.fieldValue,
            slug: genCategoryIndexSlug(item.fieldValue),
            count: item.totalCount,
          },
        ]
      : []
  );
};

export default useCategoryList;
