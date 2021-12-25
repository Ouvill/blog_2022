import { graphql, useStaticQuery } from "gatsby";
import { UseCategoryListQuery } from "../../graphql-types";
import { genCategoryIndexSlug } from "../utils/genSlug";

const useCategoryList = () => {
  const data = useStaticQuery<UseCategoryListQuery>(graphql`
    query UseCategoryList {
      allMdx {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return data.allMdx.group.flatMap((item) =>
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
